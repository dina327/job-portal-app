import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  internshipType: { type: String, enum: ["On-site","Remote","Hybrid"], required: true },
  paymentType: { type: String, enum: ["Paid","Unpaid"], required: true },
  paymentAmount: { type: Number, required: function() { return this.paymentType === "Paid"; } },
  duration: { type: String, required: true },
  applicationDeadline: { type: Date, required: true },
  datePosted: { type: Date, default: Date.now },
  visible: { type: Boolean, default: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref:'Company', required: true }
});
const Job = mongoose.model('Job', jobSchema);

export default Job; 
