const express = require('express');
const router = express.Router();
const { deleteMember } = require('../controllers/membersController')

//Endpoint DELETE member
router.delete('/:id', deleteMember);

module.exports = router; 