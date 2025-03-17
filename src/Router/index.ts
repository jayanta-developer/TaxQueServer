import express from "express";
import passport from "passport";

const router = express.Router();
//auth
const { sendOTP, verifyOTP } = require("../Controller/otpAuth");

//service
const {
  createService,
  getAllServices,
  getServiceById,
  deleteService,
  updateServiceById,
} = require("../Controller/service");

//Product
const {
  createProduct,
  getAllProducts,
  updateProduct,
} = require("../Controller/product");

//OTP Loging
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

//service route
router.post("/service/create", createService);
router.get("/service", getAllServices);
router.get("/service/:id", getServiceById);
router.post("/service/delete/:id", deleteService);
router.post("/service/update/:id", updateServiceById);

//product route
router.post("/product/create", createProduct);
router.get("/products", getAllProducts);
router.post("/product/update/:id", updateProduct);

export default router;
