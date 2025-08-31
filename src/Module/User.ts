import mongoose from "mongoose";

const product = new mongoose.Schema({
  productId: String,
  purchasePlan: String,
  orderData: {
    type: String,
    required: true,
  },
  requireDoc: [
    {
      docCategory: String,
      docUrlArray: [{
        docTitle: String,
        docUrl: String,
        status: {
          type: String,
          enum: ["Pending", "Accept", "Rejected"],
          default: "Pending",
        },
        rejectMessage: String,
      }],
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
