const express = require('express');
const router = express.Router();
const { deleteMember } = require('../controllers/membersController')

router.delete('/:id', deleteMember);

module.exports = router; 