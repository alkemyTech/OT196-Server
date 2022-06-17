const express = require('express');
const router = express.Router();
const { validateMember } = require('../middlewares/validators/membersValidator')
const { createMember, updateMember } = require('../controllers/membersController')

router.post('/', validateMember , createMember);
router.put('/:id', validateMember, updateMember);
module.exports = router;