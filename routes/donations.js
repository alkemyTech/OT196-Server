const express = require('express');
const router = express.Router();

router.post('/', (req, res)=> {  
 if(req.body.donation){
    res.send({msg: true})
 }
})

module.exports = router;