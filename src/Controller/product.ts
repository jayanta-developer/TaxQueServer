import { Request, Response } from "express";
const Product = require("../Module/product");

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching products" });
  }
};

// Get a product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching product" });
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const {
      title,
      rating,
      category,
      feturePoints,
      priceData,
      overView,
      keyFeatures,
      benefits,
      FAQ,
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title,
        rating,
        category,
        feturePoints,
        priceData,
        overView,
        keyFeatures,
        benefits,
        FAQ,
      },
      { new: true }
    );

    if (!updatedProduct)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating product" });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting product" });
  }
};

//Create FAQ
export const AddFAQ = async (req: Request, res: Response) => {
  try {
    const { question, answer } = req.body;
    const { id } = req.params;
    console.log(id);

    if (!question || !answer) {
      return res
        .status(400)
        .json({ message: "Question and answer are required." });
    }

    const updatedProduct = await Product.updateOne(
      { _id: id },
      { $push: { FAQ: { question, answer } } }
    );

    if (updatedProduct.modifiedCount === 0) {
      return res.status(404).json({ message: "Product not found." });
    }
    res
      .status(201)
      .json({ message: "FAQ added successfully.", updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding FAQ.", error });
  }
};

// Update an existing FAQ
export const updateFAQ = async (req: Request, res: Response) => {
  try {
    const { question, answer, productId, faqId } = req.body;

    if (!question && !answer) {
      return res.status(400).json({
        message: "At least one field (question or answer) is required.",
      });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId, "FAQ._id": faqId }, // Find product with matching FAQ
      {
        $set: {
          "FAQ.$.question": question,
          "FAQ.$.answer": answer,
        },
      },
      { new: true, runValidators: false } // Prevent full schema validation
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product or FAQ not found." });
    }

    res.status(200).json({
      message: "FAQ updated successfully.",
      updatedFAQ: updatedProduct.FAQ,
    });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    res.status(500).json({ message: "Error updating FAQ.", error });
  }
};

// Delete FAQ
export const DeleteFAQ = async (req: Request, res: Response) => {
  try {
    const { productId, faqId } = req.body;

    const product = await Product.findByIdAndUpdate(
      productId,
      { $pull: { FAQ: { _id: faqId } } },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "FAQ deleted successfully.", product });
  } catch (error) {
    res.status(500).json({ message: "Error deleting FAQ.", error });
  }
};
