import mongoose from "mongoose";

const ContactUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      state: true,
    }
  },
  date: String
});

module.exports = mongoose.model("contactUser", ContactUserSchema);
