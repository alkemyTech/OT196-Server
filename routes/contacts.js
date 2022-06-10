const express = require('express');
const router = express.Router();
const { validateContact } = require("../middlewares/validators/formsValidator");
const { createContact } = require('../controllers/contactsController');
const { adminValidation } = require("../middlewares/validators/userValidators");
const { Contact } = require("../models/index");

/*-- GET CONTACTS --*/
router.get('/', adminValidation, (req, res, next) => {
    try {
        const registerContact = Contact.findAll({
            Attributes: [
                'name',
                'email',
                'phone',
                'message'
            ]
        })
        res.status(200).json(registerContact)
    } catch (error) {
        res.status(500).json({success: false, message: error.message })
    }
})

router.post('/', validateContact, createContact)

module.exports = router;