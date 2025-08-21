import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
  },
  type: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship"],
    required: true,
  },
  experience: {
    type: String,
  },
  skills: {
    type: [String],
    default: [],
  },
  description: {
    type: String,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  jobLocation: {
    type: String,
    enum: ["on-site", "hybrid", "remote"],
    required: true,
  },
  metaTitle: {
    type: String,
    required: true,
  },
  metaDescription: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Job", JobSchema);
