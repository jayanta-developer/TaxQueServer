import { Request, Response } from "express";
const User = require("../Module/User");

export const createUser = async (req: Request, res: Response) => {
  try {
    const userIput = new User(req.body);
    await userIput.save();

    res.status(201).json({ success: true, user: userIput });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};

export const GetUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, user: users });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};
export const GetUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};
export const GetUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};

export const UpdateUser = async (req: Request, res: Response) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updateUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const DeleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "Service not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
