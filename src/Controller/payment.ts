// import { Request, Response } from "express";
// import Razorpay from "razorpay";
// import crypto from "crypto";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID || "",
//   key_secret: process.env.RAZORPAY_KEY_SECRET || "",
// });

// interface User {
//   id: string;
//   services: { serviceId: string; granted: boolean; date: Date }[];
// }
// let USERS: User[] = [];

// Create Razorpay Order
// export const PaymentOrder = async (req: Request, res: Response) => {
//   const { amount, userId, serviceId } = req.body;

//   const options = {
//     amount: amount * 100,
//     currency: "INR",
//     receipt: `receipt_${serviceId}_${Date.now()}`,
//   };

//   try {
//     const order = await razorpay.orders.create(options);
//     res.json({ order });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: "Internal server error", error: error });
//   }
// };
