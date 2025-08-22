import { Request, Response } from "express";
const Application = require("../Module/Application"); // ✅ use import, not require


// ✅ Create application
export const createApplication = async (req: Request, res: Response) => {
  try {
    const {
      jobId,
      fullName,
      email,
      phone,
      address,
      resume,
      experienceYears,
      currentJobTitle,
      expectedSalary,
      noticePeriod,
    } = req.body;

    if (!jobId || !fullName || !email || !resume) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newApplication = new Application({
      jobId,
      fullName,
      email,
      phone,
      address,
      resume,
      experienceYears,
      currentJobTitle,
      expectedSalary,
      noticePeriod,
    });

    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error: any) {
    res.status(500).json({ message: "Error creating application", error: error.message });
  }
};

// ✅ Get all applications (optionally filter by jobId)
export const getAllApplications = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.query;
    const filter = jobId ? { jobId } : {};

    const applications = await Application.find(filter).populate("jobId");
    res.status(200).json(applications);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
};

// ✅ Get one application by ID
export const getApplicationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id).populate("jobId");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(application);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching application", error: error.message });
  }
};

// ✅ Update application (mainly status)
export const updateApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Pending", "Reviewed", "Shortlisted", "Rejected", "Hired"];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(updatedApplication);
  } catch (error: any) {
    res.status(500).json({ message: "Error updating application", error: error.message });
  }
};

// ✅ Delete application
export const deleteApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedApplication = await Application.findByIdAndDelete(id);

    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting application", error: error.message });
  }
};