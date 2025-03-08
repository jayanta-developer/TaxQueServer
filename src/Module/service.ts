import mongoose from "mongoose";

const FAQItem = new mongoose.Schema({
  question: {
    type: {
      type: String,
      required: true,
    },
  },
  answer: {
    type: String,
    required: true,
  },
});

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summery: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  products: [
    {
      type: String,
      required: true,
    },
  ],
  FAQ: [FAQItem],
});

module.exports = mongoose.model("Service", ServiceSchema);
