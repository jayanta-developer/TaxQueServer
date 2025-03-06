import { Request, Response } from "express";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const otpStore: { [email: string]: number } = {};

export const sendOTP = async (req: Request, res: Response) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = otp;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP" });
    console.log(error);
  }
};

export const verifyOTP = (req: Request, res: Response) => {
  const { email, otp } = req.body;
  if (otpStore[email] === parseInt(otp)) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    delete otpStore[email]; // Remove OTP after use
    res.json({ token });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
};
