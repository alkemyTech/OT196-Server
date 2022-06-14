const express = require('express');
const router = express.Router();
const { updateActivity, getActivityDetails } = require("../controllers/activitiesController");
const { adminValidation } = require('../middlewares/validators/userValidators');
const { validateActivity  } = require("../middlewares/validators/formsValidator");
const { validateNewActivity } = require('../middlewares/validators/activityValidator')
const { createActivity } = require("../controllers/activitiesController");
const { validateNewActivity } = require('../middlewares/validators/activityValidator')

router.put('/:id', express.json({limit: "2mb"}), validateActivity, adminValidation, updateActivity)

router.use(express.json())
router.use(express.urlencoded({extended: false}))

//More endpoints with default limit

router.get("/:id", getActivityDetails);
router.post("/", adminValidation, validateNewActivity, createActivity); 

module.exports = router;
