var express = require('express');
var router = express.Router();
const { createNews, UpdateNews } = require('../controllers/newsController')
const { validateNewsPost } = require("../middlewares/validators/formsValidator")
const { adminValidation } = require("../middlewares/validators/userValidators")
const { Entry } = require("../models/index");

router.post('/', express.json({limit: "2mb"}), adminValidation, validateNewsPost, createNews);

router.use(express.json())
router.use(express.urlencoded({extended: false}))

/*-- PUT NEWS --*/
router.put('/:idNews', UpdateNews);

//More endpoints with default limit
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
                where: {
                    type: 'news'
                }
            }
        )
        res.status(200).json(allNews)
    } catch (err) {
        res.error(err.status || 403)
    }
})

// GET NEWS BY ID 
router.get('/:id', async (req, res)=> {
    const { id } = req.params;
    try {
    const response = await Entry.findOne({
        where: { 
            type: 'news', 
            id: id 
        }
    })
    res.send(response)
    } catch (error) {
        res.status(404).send(error)
    }
    
})


module.exports = router;