var express = require('express');
var router = express.Router();

const Newscontroller = require('../controllers/newsController')
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
        res.status(200).json(allNews)
    } catch (err) {
        res.error(err.status || 403)
    }
})

// GET SINGLE NEWS BY ID 
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const myNew = await Entry.findOne({
            where: {
                id: id
            },
            attributes: [
                'id',
                'name',
                'image',
                'content'
            ],
        })
        res.json(myNew)
    } catch (error) {
        res.status(404).send(error)
    }

})

// DELETE SINGLE NEWS BY ID

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const entryToDestroy = await Entry.destroy({
        where: { id },
    })
    // Validate if the entry exists
    if (entryToDestroy) {
        res.status(200).send( `News ${id} deleted` )
    } else {
        return res.status(404).json({
            success: false,
            msj: 'No se encontró ninguna noticia',
        });
    }



});


module.exports = router;
