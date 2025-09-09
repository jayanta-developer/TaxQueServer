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
    City: {
      type: String,
      required: true,
    },
    Pincode: {
      type: String,
      required: true,
    },
    PostOffice: {
      type: String,
      state: true,
    },
    State: {
      type: String,
      state: true,
    }
  },
  date: String,
  section: {
    type: String,
    required: true,
  },
  service: String
});

module.exports = mongoose.model("contactUser", ContactUserSchema);
