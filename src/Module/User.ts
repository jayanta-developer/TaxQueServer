import mongoose from "mongoose";

const product = new mongoose.Schema({
  productId: String,
  orderData: {
    type: String,
    required: true,
  },
  requireDoc: [
    {
      docTitle: String,
      docUrl: [],
      status: String,
      rejectMessage: String,
    },
  ],
});
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  purchase: [product],
});

module.exports = mongoose.model("User", UserSchema);
