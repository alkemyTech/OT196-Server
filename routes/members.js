const express = require('express');
const router = express.Router();
const { validateMember } = require('../middlewares/validators/membersValidator')
const { createMember, getMembers } = require('../controllers/membersController')

// Endpoint GET members
router.get('/', getMembers)

//Endpoint POST members
router.post('/', validateMember , createMember);

module.exports = router;