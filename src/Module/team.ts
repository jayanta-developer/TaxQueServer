import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  media: {
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linkedin: {
      type: String,
    },
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Team", TeamSchema);