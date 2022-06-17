const express = require('express');
const router = express.Router();
const { validateMember } = require('../middlewares/validators/membersValidator')
const { createMember, deleteMember } = require('../controllers/membersController')

//Endpoint DELETE member
router.delete('/:id', deleteMember);

router.post('/', validateMember , createMember);

module.exports = router;

