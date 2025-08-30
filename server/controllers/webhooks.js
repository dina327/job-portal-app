import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // ✅ Verify with raw body instead of parsed JSON
    const payload = req.body.toString("utf8"); // raw buffer converted to string
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    await whook.verify(payload, headers);

    // Parse JSON payload
    const { data, type } = JSON.parse(payload);

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url,
          resume: "",
        };

        // ✅ Upsert to avoid duplicate errors
        await User.findOneAndUpdate({ _id: data.id }, userData, {
          upsert: true,
          new: true,
        });
        return res.json({ success: true });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url,
        };

        await User.findOneAndUpdate({ _id: data.id }, userData, {
          upsert: true,
          new: true,
        });
        return res.json({ success: true });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.json({ success: true });
      }

      default:
        return res.json({ success: true });
    }
  } catch (error) {
    console.error("Webhook error:", error.message);
    res.status(500).json({ success: false, message: "Webhooks Error" });
  }
};
