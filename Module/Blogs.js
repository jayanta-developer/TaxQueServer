const mongoose = require("mongoose");

const SummeryItem = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const BlogSchema = new mongoose.Schema({
  images: [
    {
      image: {
        type: String,
        required: true,
      },
      altText: {
        type: String,
        required: true,
      },
      imgId: {
        type: String,
        // required: true,
      },
    },
  ],
  conclusion: {
    type: String,
    required: true,
  },
  SummeryArray: [SummeryItem],
  meta_title: {
    type: String,
    required: true,
  },
  meta_description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Blog", BlogSchema);
