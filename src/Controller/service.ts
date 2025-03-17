import { Request, Response } from "express";
const Service = require("../Module/service");

// Create a new service
export const createService = async (req: Request, res: Response) => {
  try {
    const { title, summary, products, imageUrl, FAQ } = req.body;
    if (!title || !summary || !imageUrl || !products || !FAQ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newService = new Service({
      title,
      summary,
      imageUrl,
      products,
      FAQ,
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
export const getAllServices = async (_req: Request, res: Response) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single service by ID
export const getServiceById = async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single service by ID
export const updateServiceById = async (req: Request, res: Response) => {
  try {
    const updateService = await Service.findByIdAndUpdate(
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
export const deleteService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
