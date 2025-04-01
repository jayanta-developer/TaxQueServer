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
