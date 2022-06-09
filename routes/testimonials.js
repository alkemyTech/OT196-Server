var express = require("express");
const {
  getAllTestimonials,
  createTestimony,
} = require("../controllers/testimonialsController");
var router = express.Router();
const validateTest = require("../controllers/validateTestimony");

router.get("/1/public", getAllTestimonials);
router.post("/", validateTest, createTestimony);

module.exports = router;
