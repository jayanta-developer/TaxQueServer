import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  resume: {
    type: String,
    required: true,
  },
  experienceYears: {
    type: String,
  },
  currentJobTitle: {
    type: String,
  },
  expectedSalary: {
    type: String,
  },
  noticePeriod: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Shortlisted", "Rejected", "Hired"],
    default: "Pending",
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Application", ApplicationSchema);
