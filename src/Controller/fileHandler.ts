import { put } from "@vercel/blob";
import { Request, Response } from "express";

export const HandleFile = async (req: Request, res: Response) => {
  const { filename } = req.query;

  if (!filename || typeof filename !== "string") {
    return res.status(400).json({ error: "Filename must be a string" });
  }

  try {
    const blob = await put(filename, req, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    console.log("Upload success:", blob);
    return res.json({ url: blob.url });
  } catch (err: any) {
    console.error("Upload error details:", err?.message || err);
    return res
      .status(500)
      .json({ error: "Upload failed", detail: err?.message || err });
  }
};
