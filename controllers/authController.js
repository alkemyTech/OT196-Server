const { User } = require('../models/index')
const bcrypt = require('bcrypt')

exports.login = async function( req, res ){
    var {email, password} = req.body
    
    // Check if user exists
    const userExist = await User.findOne({ where: { email: email } });
    if (!userExist) return res.status(404).send({ok: false})
    
    //Decrypt and check password 
    const passwordMatch = await bcrypt.compare(password, userExist.password)
    if (!passwordMatch) return res.status(401).send({ok: false})

    res.send(userExist)

}
