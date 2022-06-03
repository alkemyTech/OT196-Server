const express = require('express');
const router = express.Router();
const { adminValidation } = require('../middlewares/validators/userValidators');
const { validateContact } = require("../middlewares/validators/formsValidator");
const { createContact } = require('../controllers/contactsController');

router.post('/', validateContact, createContact)

module.exports = router;