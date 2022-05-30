var express = require('express');
var router = express.Router();
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