import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/jobPortal`, {
      tls: true,
      ssl: true,
      serverSelectionTimeoutMS: 5000, // quick fail if TLS fails
    });
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
