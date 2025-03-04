const express = require("express");
const router = express.Router();

const {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  createBlog,
  getAllBlogs,
  updateBlogs,
  deleteBlos,
  getBlogById,
} = require("../Controller");

//Flats
router.post("/flats/create", createProperty);
router.get("/flats", getAllProperties);
router.get("/flats/:id", getPropertyById);
router.post("/flats/update/:id", updateProperty);
router.post("/flats/delete/:id", deleteProperty);

//Blogs
router.post("/blog/create", createBlog);
router.get("/blogs", getAllBlogs);
router.get("/blog/:id", getBlogById);
router.post("/blog/update/:id", updateBlogs);
router.post("/blog/delete/:id", deleteBlos);

module.exports = router;
