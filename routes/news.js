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
                    'id',
                    'name',
                    'image',
                    'createdAt'
                ],
                where:{ 
                    type: 'news'
                }
            }
        )
        res.status(200).json(allNews)
    } catch (err) {
        res.status(500).json({success: false, error: err.message})
    }
})


module.exports = router;