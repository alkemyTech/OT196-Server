const JWT_SECRET = process.env.DB_TOKEN
const jwt = require('jsonwebtoken');
const adminRoles = [1]
const { User } = require("../../models/index");

exports.adminValidation = async function(req,res,next){
    if (!req.headers.authorization) {return res.status(401).json({ error: "Token is required!" })}
    const reqToken = req.headers.authorization.split(' ')[1];
    const token = jwt.verify(reqToken, JWT_SECRET, function (err, suc) {return(err ? false : suc)})
    const role = token.roleId 
    if (role === undefined) return res.status(403).json({ error: "Invalid or malformed token!" })
    if (!adminRoles.includes(role)) return res.status(403).json({ error: "User role unauthorized!" })
    next()
}
exports.loggedValidation = async function(req,res,next){
    if (!req.headers.authorization) {return res.status(401).json({ error: "Token is required!" })}
    const reqToken = req.headers.authorization.split(' ')[1];
    const token = jwt.verify(reqToken, JWT_SECRET, function (err, suc) {return(err ? false : suc)})
    if (!token || !token.id) return res.status(404).json({ error: "Invalid user token!" }) 
    res.locals.user = token
    next()
}