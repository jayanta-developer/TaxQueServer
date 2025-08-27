import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  Slug: {
    type: String,
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
  date: String,
  category: String,
  blogText: [
    {
      title: {
        type: String,
        required: true,
      },
      summarys: [{ summary: String }],
    },
  ],
});

module.exports = mongoose.model("Blog", BlogSchema);
