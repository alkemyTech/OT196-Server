var express = require("express");
const {
  getAllTestimonials,
  createTestimony,
  deleteTestimony,
} = require("../controllers/testimonialsController");
var router = express.Router();
const validateTest = require("../controllers/validateTestimony");
const { adminValidation } = require("../middlewares/validators/userValidators");

router.get("/1/public", getAllTestimonials);
router.post("/", validateTest, createTestimony);
router.delete("/:id", adminValidation, deleteTestimony);

module.exports = router;
