const { Router } = require("express");
const router = Router()
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

// GET NEW BY ID 
router.get('/:id', async (req, res)=> {
    const { id } = req.params;
    try {
    const myNew = await Entry.findOne({
        where: { 
            type: 'news', 
            id: id 
        }
    })
    res.send(myNew)
    } catch (error) {
        res.status(404).send(error)
    }
    
})


module.exports = router;
