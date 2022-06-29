const express = require('express');
const router = express.Router();

router.post('/', (req, res)=> {
 console.log(req.body)   
 if(req.body.donation){
    res.send({msg: true})
 }

})

module.exports = router;