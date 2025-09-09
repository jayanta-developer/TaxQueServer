import { Request, Response } from "express";
const User = require("../Module/User");
const ContactUser = require("../Module/ContactUser")


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
export const UpdateProductDoc = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.params;
    const updateData = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // Find the product by _id inside the purchase array
    const product = user.purchase.find((val: any) => val.productId === productId);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found in user's purchase history." });
    }

    product.requireDoc.push(...updateData);
    await user.save();
    res.status(200).json({
      message: "Document added to requireDoc successfully.",
      updatedRequireDoc: product.requireDoc,
    });
  } catch (error) {
    console.error("Error updating purchased product DOC:", error);
    res.status(500).json({ message: "Server error.", error });
  }
};



// Contact user 
export const CreateContactUser = async (req: Request, res: Response) => {
  try {
    const userIput = new ContactUser(req.body);
    await userIput.save();

    res.status(201).json({ success: true, user: userIput });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};
export const GetContactUsers = async (req: Request, res: Response) => {
  try {
    const users = await ContactUser.find();
    res.status(200).json({ success: true, user: users });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};



export const UpdateRejectMessage = async (req: Request, res: Response) => {
  const { userId, productId, docId, newMessage, status } = req.body;

  try {
    const result = await User.updateOne(
      {
        _id: userId,
        "purchase.productId": productId,
        "purchase.requireDoc._id": docId,
      },
      {
        $set: {
          "purchase.$[p].requireDoc.$[d].rejectMessage": newMessage,
          "purchase.$[p].requireDoc.$[d].status": status,
        },
      },
      {
        arrayFilters: [
          { "p.productId": productId },
          { "d._id": docId },
        ],
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Document not found or not updated" });
    }

    res.status(200).json({ message: "Reject message updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const UpdateDoc = async (req: Request, res: Response) => {
  const { userId, productId, docId, newMessage, status, url } = req.body;

  try {
    const result = await User.updateOne(
      {
        _id: userId,
        "purchase.productId": productId,
        "purchase.requireDoc._id": docId,
      },
      {
        $set: {
          "purchase.$[p].requireDoc.$[d].rejectMessage": newMessage,
          "purchase.$[p].requireDoc.$[d].status": status,
        },
        $push: {
          "purchase.$[p].requireDoc.$[d].docUrl": url,
        },
      },
      {
        arrayFilters: [
          { "p.productId": productId },
          { "d._id": docId },
        ],
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Document URL not found or not updated" });
    }

    res.status(200).json({ message: "Doc url updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
