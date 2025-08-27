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

// //category
const {
  createCategory,
  getAllCategory,
  getCategoryById,
  deleteCategory,
  updateCategoryById,
} = require("../Controller/category");

//service
const {
  createService,
  getAllService,
  getServiceById,
  updateService,
  deleteService,
  AddFAQ,
  updateFAQ,
  DeleteFAQ,
  AddPriceItem,
  UpdatePrice,
  DeletePricePlan,
} = require("../Controller/service");

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
  GetOneBlog,
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

//Application
const {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication

} = require("../Controller/Application")

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

//Category route
router.post("/category/create", createCategory);
router.get("/category", getAllCategory);
router.get("/category/:slug", getCategoryById);
router.post("/category/delete/:id", deleteCategory);
router.post("/category/update/:id", updateCategoryById);

//Service route
router.post("/service/create", createService);
router.get("/service", getAllService);
router.get("/service/:slug", getServiceById);
router.post("/service/update/:id", updateService);
router.post("/service/delete/:id", deleteService);
router.post("/service/faq/add/:id", AddFAQ);
router.post("/service/faq/update", updateFAQ);
router.post("/service/faq/delete", DeleteFAQ);
router.post("/service/price/add/:id", AddPriceItem);
router.post("/service/price/update/:id/:priceItemId", UpdatePrice);
router.post("/service/price/delete/:id/:priceItemId", DeletePricePlan);

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
router.get("/blog/:slug", GetOneBlog);
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

//Application
router.post("/application/create", createApplication);
router.get("/application", getAllApplications);
router.get("/application/:id", getApplicationById);
router.post("/application/update/:id", updateApplication);
router.post("/application/delete/:id", deleteApplication);

//Review
// router.get("/getAccout", getAccounts)

//file
router.post("/blob", express.raw({ type: "*/*", limit: "50mb" }), HandleFile);

export default router;
