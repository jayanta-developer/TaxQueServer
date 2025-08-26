import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import Razorpay from "razorpay";
import crypto from "crypto";
const User = require("../Module/User");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

// Create Razorpay Order
export const PaymentOrder = async (req: Request, res: Response) => {
  const { amount, serviceId } = req.body;
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `rcpt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ order });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};

// Verify Payment and Grant Access
export const VerifyPayment = async (req: Request, res: Response) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userId,
    serviceId,
    purchasePlan
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    const updateUser = await User.updateOne(
      { _id: userId },
      {
        $push: {
          purchase: {
            productId: serviceId,
            orderData: new Date().toISOString().split("T")[0],
            purchasePlan
          },
        },
      }
    );

    if (!updateUser) return res.status(404).json({ message: "User not found" });

    // const existingUser = USERS.find((u) => u.id === userId);
    // const user: User = existingUser || { id: userId, services: [] };
    // user.services.push({ serviceId, granted: true, date: new Date() });
    // USERS = USERS.filter((u) => u.id !== userId).concat(user);

    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Signature mismatch" });
  }
};

export const getInvoice = async (req: Request, res: Response) => {
  try {
    const { userId, serviceName, amount } = req.body;
    const invoice = {
      invoiceId: "INV_" + Date.now(),
      userId,
      serviceName,
      amount,
      date: new Date(),
    };

    // In real app: Send email here
    res.json({ success: true, invoice });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};
