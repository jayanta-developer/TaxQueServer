import express from "express";
import passport from "passport";

const router = express.Router();

//Payments
const {
  PaymentOrder,
  VerifyPayment,
  getInvoice,
} = require("../Controller/payment");


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
  deleteProduct,
  AddFAQ,
  updateFAQ,
  DeleteFAQ,
  AddPriceItem,
  UpdatePrice,
  DeletePricePlan,
} = require("../Controller/product");

//User
const {
  createUser,
  GetUsers,
  UpdateUser,
  DeleteUser,
  GetUserByEmail,
  GetUserById,
  UpdateProductDoc,
  CreateContactUser,
  GetContactUsers,
  UpdateRejectMessage,
  UpdateDoc
} = require("../Controller/user");

//Blog
const {
  createBlog,
  GetBlogs,
  UpdateBlog,
  DeleteBlog,
} = require("../Controller/blog");

//Team
const { createTeam, getAllTeams, updateTeam, deleteTeam, fix } = require("../Controller/team")

//Job
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} = require("../Controller/job")

//review
// const { getAccounts } = require("../Controller/GoogleReview")


//file
const { HandleFile } = require("../Controller/fileHandler");


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
router.post("/product/delete/:id", deleteProduct);
router.post("/product/faq/add/:id", AddFAQ);
router.post("/product/faq/update", updateFAQ);
router.post("/product/faq/delete", DeleteFAQ);
router.post("/product/price/add/:id", AddPriceItem);
router.post("/product/price/update/:id/:priceItemId", UpdatePrice);
router.post("/product/price/delete/:id/:priceItemId", DeletePricePlan);

//User
router.post("/user/create", createUser);
router.get("/users", GetUsers);
router.post("/user/update/:id", UpdateUser);
router.post("/user/delete/:id", DeleteUser);
router.post("/user/get-by-email", GetUserByEmail);
router.get("/user/get-by-id/:id", GetUserById);
router.post("/user/update_doc/:userId/:productId", UpdateProductDoc);
router.post("/user/update_doc_message", UpdateRejectMessage);
router.post("/user/update_doc_url", UpdateDoc);
//Contact
router.post("/contact-user/create", CreateContactUser);
router.get("/contact-user", GetContactUsers);


//Blos-
router.post("/blog/create", createBlog);
router.get("/blogs", GetBlogs);
router.post("/blog/update/:id", UpdateBlog);
router.post("/blog/delete/:id", DeleteBlog);

//Team
router.post("/team/create", createTeam)
router.get("/teams", getAllTeams)
router.post("/team/update/:id", updateTeam)
router.post("/team/delete/:id", deleteTeam)
router.get("/team/fix", fix)

//Payments
router.post("/create-order", PaymentOrder);
router.post("/verify-payment", VerifyPayment);
router.post("/send-invoice", getInvoice);

//Job
router.post("/job/create", createJob);
router.get("/jobs", getAllJobs);
router.get("/job/getOne/:id", getJobById);
router.post("/job/update/:id", updateJob);
router.post("/job/delete/:id", deleteJob);

//Review
// router.get("/getAccout", getAccounts)

//file
// router.post("/blob", express.raw({ type: "*/*", limit: "50mb" }), HandleFile);

export default router;
