const express = require('express');
const router = express.Router();
const { validateMember } = require('../middlewares/validators/membersValidator')
const { createMember } = require('../controllers/membersController')

router.post('/', validateMember , createMember);

module.exports = router;