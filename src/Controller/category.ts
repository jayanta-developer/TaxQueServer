import { Request, Response } from "express";
const Category = require("../Module/category");

// Create a new service
export const createCategory = async (req: Request, res: Response) => {
  try {
    const {
      title,
      Slug,
      summary,
      imageUrl,
      category,
      imgAltTag,
      metaTitle,
      metaDescription,
    } = req.body;
    if (
      !title ||
      !Slug ||
      !summary ||
      !imageUrl ||
      !category ||
      !imgAltTag ||
      !metaTitle ||
      !metaDescription
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newService = new Category({
      title,
      Slug,
      summary,
      imageUrl,
      category,
      imgAltTag,
      metaTitle,
      metaDescription,
    });
    await newService.save();

    res
      .status(201)
      .json({ message: "Service created successfully", service: newService });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    console.log(error);
  }
};

// Get all services
export const getAllCategory = async (_req: Request, res: Response) => {
  try {
    const services = await Category.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single service by ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const service = await Category.findOne({ Slug: req.params.slug });
    if (!service) return res.status(404).json({ message: "Service not found" });

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single service by ID
export const updateCategoryById = async (req: Request, res: Response) => {
  try {
    const updateService = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateService)
      return res.status(404).json({ message: "Service not found" });

    res.status(200).json(updateService);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete service
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const service = await Category.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
