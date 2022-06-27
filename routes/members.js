const express = require('express');
const router = express.Router();
const { validateMember } = require('../middlewares/validators/membersValidator')
const { createMember, getMembers, updateMember deleteMember } = require('../controllers/membersController')

// Endpoint GET members
router.get('/', getMembers)

//Endpoint DELETE member
router.delete('/:id', deleteMember);

//Endpoint POST members
router.post('/', validateMember , createMember);

router.put('/:id', validateMember, updateMember);
module.exports = router;
