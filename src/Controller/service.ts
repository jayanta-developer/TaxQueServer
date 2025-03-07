import { Request, Response } from "express";
import Service from "../Module/service";

// Create a new service
export const createService = async (req: Request, res: Response) => {
  try {
    const { title, summery, products, imageUrl } = req.body;
    if (!title || !summery || !imageUrl || !products) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newService = new Service({
      title,
      summery,
      image: imageUrl,
      products,
    });
    await newService.save();

    res
      .status(201)
      .json({ message: "Service created successfully", service: newService });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
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
