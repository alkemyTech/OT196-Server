var express = require('express');
var router = express.Router();
const { createNews } = require('../controllers/newsController')
const { validateNewsPost } = require("../middlewares/validators/formsValidator")
const { adminValidation } = require("../middlewares/validators/userValidators")
const db = require("../models/index");
const { Entry } = db;

router.post('/', express.json({limit: "2mb"}), adminValidation, validateNewsPost, createNews);

router.use(express.json())
router.use(express.urlencoded({extended: false}))

//More endpoints with default limit
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