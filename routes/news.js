var express = require('express');
var router = express.Router();

const Newscontroller = require ('../controllers/newsController')
const db = require("../models/index");
const { Entry } = db;

/*-- PUT NEWS --*/
router.put('/:idNews', Newscontroller);


/*-- GET NEWS --*/
router.get('/', async (req, res, next) => {
    try {
        const allNews = await Entry.findAll(
            {
                attributes: [
                    'id',
                    'name',
                    'image',
                    'createdAt'
                ],
                where: {
                    type: 'news'
                }
            }
        )
        res.json(allNews)
    } catch (err) {
        res.error(err.status || 403)
    }
})

module.exports = router;
