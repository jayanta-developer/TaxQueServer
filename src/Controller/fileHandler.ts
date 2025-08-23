import { Request, Response, NextFunction } from "express";
import { put } from "@vercel/blob";

export const HandleFile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { filename } = req.query;

  if (!filename || typeof filename !== "string") {
    res.status(400).json({ error: "Filename must be a string" });
    return;
  }

  try {
    const blob = await put(filename, req.body, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    res.json({ url: blob.url });
  } catch (err: any) {
    // console.error("Upload error details:", err?.message || err);
    console.log("My errro message", err);
    res
      .status(500)
      .json({ error: "Upload failed", detail: err?.message || err });
  }
};
