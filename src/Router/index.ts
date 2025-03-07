import express from "express";
import passport from "passport";

const router = express.Router();
const { sendOTP, verifyOTP } = require("../Controller/otpAuth");

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

// ✅ Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  const user: any = req.user;
  const token = user.token;
  res.redirect(`${process.env.FRONTEND_URL}/login-success?token=${token}`);
});

router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  (req, res) => {
    res.json(req.user as any);
  }
);

router.get("/linkedin", passport.authenticate("linkedin"));
router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", { session: false }),
  (req, res) => {
    res.json(req.user as any);
  }
);

export default router;
