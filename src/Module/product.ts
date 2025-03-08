import mongoose from "mongoose";

const BenefitsType = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summerys: [
    {
      type: String,
    },
  ],
  BenefitItems: [
    {
      title: {
        type: String,
        required: true,
      },
      summery: {
        type: String,
        required: true,
      },
    },
  ],
});

const keyFeatureType = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summerys: [
    {
      type: String,
    },
  ],
  keyFeatureItems: [
    {
      title: {
        type: String,
        required: true,
      },
      summery: {
        type: String,
        required: true,
      },
    },
  ],
});

const overViewType = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summerys: [
    {
      type: String,
    },
  ],
});
const productPriceItem = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  basicPrice: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  summery: {
    type: String,
    required: true,
  },
  fetures: [
    {
      type: String,
      required: true,
    },
  ],
  MostPopular: {
    type: Boolean,
    required: true,
  },
});

const SummeryItem = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summery: {
    type: String,
    required: true,
  },
});

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  feturePoints: [SummeryItem],
  priceData: [productPriceItem],
  overView: [overViewType],
  keyFeatures: [keyFeatureType],
  benefits: [BenefitsType],
});

module.exports = mongoose.model("Product", ProductSchema);
