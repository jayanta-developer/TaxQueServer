import { Request, Response, Router } from "express";
import { google } from "googleapis";
import path from "path";
import fs from "fs";

const router = Router();

// Load OAuth credentials
const CREDENTIALS_PATH = path.join(__dirname, "../credentials.json");
const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf-8"));

const { client_id, client_secret, redirect_uris } = credentials.web;

const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0] // use the first redirect URL from JSON
);

// 🔹 Step 1: Generate the Google login URL
router.get("/login", (req: Request, res: Response) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
  });

  res.redirect(url);
});

// 🔹 Step 2: Google redirects here after user login
router.get("/oauth2callback", async (req: Request, res: Response) => {
  const code = req.query.code as string;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Example: get user profile
    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();

    res.json({
      message: "Login successful",
      user: userInfo.data,
      tokens,
    });
  } catch (error) {
    console.error("Error exchanging code for tokens", error);
    res.status(500).send("Authentication failed");
  }
});

export default router;
