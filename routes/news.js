var express = require('express');
var router = express.Router();
<<<<<<< HEAD
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

=======
const db = require("../models/index");
const { Entry } = db;

/*-- GET NEWS --*/
router.get('/', async (req, res, next) => {
    try {
        const allNews = await Entry.findAll(
            { 
                attributes:[
                    'name',
                    'image',
                    'createdAt' 
                ],
                where:{ 
                    type: 'news'
                }
            }
        )
        res.json(allNews)
    } catch (err) {
        res.error(err.status||403)
    }
})


module.exports = router;
>>>>>>> 69f896c50d8a0c9c9511f37d2270dde70278acde
