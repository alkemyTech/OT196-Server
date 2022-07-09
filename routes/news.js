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
router.put('/:idNews', adminValidation, validateNewsPost, UpdateNews);

//More endpoints with default limit
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
            id: id 
        },
        attributes:[
            'id',
            'name',
            'image',
            'content'
        ],
    })
    res.send(response)
    } catch (error) {
        res.status(404).send(error)
    }

})

// DELETE SINGLE NEWS BY ID

router.delete('/:id', adminValidation, async (req, res) => {
    const { id } = req.params
    const entryToDestroy = await Entry.destroy({
        where: { id },
    })
    // Validate if the entry exists
    if (entryToDestroy) {
        res.status(200).send( `News ${id} deleted`)
    } else {
        return res.status(404).json({
            success: false,
            msj: 'No se encontró ninguna noticia',
        });
    }



});


module.exports = router;