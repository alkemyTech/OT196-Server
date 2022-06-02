const express = require('express');
const router = express.Router();
const db = require("../models/index");
const { updateActivity } = require("../controllers/activitiesController");
const { adminValidation } = require('../middlewares/validators/userValidators');
const { validateActivity } = require("../middlewares/validators/formsValidator")

router.put('/:id', adminValidation, updateActivity)

module.exports = router;