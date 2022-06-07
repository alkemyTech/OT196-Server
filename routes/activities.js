const express = require("express");
const router = express.Router();
const { adminValidation } = require("../middlewares/validators/userValidators");
const {
  validateNewActivity,
} = require("../middlewares/validators/activityValidator");
const { createActivity } = require("../controllers/activitiesController");

router.post("/", adminValidation, validateNewActivity, createActivity);

module.exports = router;
