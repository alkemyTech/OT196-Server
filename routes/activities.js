const express = require("express");
const router = express.Router();
const { getActivityDetails } = require("../controllers/activitiesController");
const { adminValidation } = require("../middlewares/validators/userValidators");
const {
  validateNewActivity,
} = require("../middlewares/validators/activityValidator");
const { createActivity } = require("../controllers/activitiesController");

router.get("/:id", getActivityDetails);
router.post("/", adminValidation, validateNewActivity, createActivity);

module.exports = router;
