const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true, // Ensure uniqueness
    default: () => new mongoose.Types.ObjectId().toString(), // Auto-generate unique id
  },
  title: {
    type: String,
    required: true,
  },
  summery: {
    type: String,
    required: true,
  },
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
  video: {
    type: String, // URL or path to the video
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  mapLat: {
    type: String,
    required: true,
  },
  mapLong: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  bath: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  meta_title: {
    type: String,
    required: true,
  },
  meta_description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  facilities: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Property", PropertySchema);
