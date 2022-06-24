const express = require('express');
const router = express.Router();
const { validateMember } = require('../middlewares/validators/membersValidator')
const { createMember, getMembers, updateMember } = require('../controllers/membersController')

// Endpoint GET members
router.get('/', getMembers)

//Endpoint POST members
router.post('/', validateMember , createMember);
router.put('/:id', validateMember, updateMember)
module.exports = router;