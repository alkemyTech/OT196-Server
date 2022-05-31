var express = require('express');
var router = express.Router();
const db = require('../models/index');

// Add News
const { Entry } = db;
const Newscontroller = require('../controllers/newsController')


/* GET news for testing. */
router.get('/', function (req, res, next) {
    res.send('respond with a News');
});

/* Update news */

router.put('/:id', Newscontroller);

module.exports = router;

