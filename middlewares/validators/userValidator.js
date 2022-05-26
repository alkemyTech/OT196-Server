const JWT_SECRET = process.env.DB_TOKEN
const jwt = require('jsonwebtoken');
const adminRoles = [1]

exports.roleVerify = async function(req,res,next){
    const reqToken = req.headers.authorization.replace("Bearer ", "");
    const token = jwt.verify(reqToken, JWT_SECRET, function (err, suc) {
        if (err) {return res.status(401).end('Invalid token.');}
        return suc
    })
    const role = token.roleId 
    if (!role) return res.status(400).end('Token data invalid.')
    if (!adminRoles.includes(role)) return res.status(403).end('User role unauthorized')
    
    next()
}