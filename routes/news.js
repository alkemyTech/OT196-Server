const { Router } = require("express");
const router = Router()

router.get('/:id', (req, res)=> {
    const { id } = req.params;
    try {
    console.log(111, id)
    let users = 'user' + id; 
    res.send(users)
    } catch (error) {
        console.log(error)
    }
    
})


module.exports = router