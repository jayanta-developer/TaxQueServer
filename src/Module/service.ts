import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summery: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  products: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Blog", ServiceSchema);
