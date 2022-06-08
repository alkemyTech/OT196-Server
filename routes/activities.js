const express = require("express");
const router = express.Router();
const { getActivityDetails } = require("../controllers/activitiesController");

router.get("/:id", getActivityDetails);

module.exports = router;
