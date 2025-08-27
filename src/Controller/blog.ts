import { Request, Response } from "express";
const Blog = require("../Module/blog");

export const createBlog = async (req: Request, res: Response) => {
  try {
    const blogIput = new Blog(req.body);
    await blogIput.save();

    res.status(201).json({ success: true, blog: blogIput });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};

export const GetBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ success: true, blog: blogs });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};
export const GetOneBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne({ Slug: req.params.slug });
    res.status(200).json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};

export const UpdateBlog = async (req: Request, res: Response) => {
  try {
    const blogUser = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!blogUser) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(blogUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const DeleteBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
