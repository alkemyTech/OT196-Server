const { Entry } = require('../models/index')

exports.createNews = async function( req, res ){
    // Admin role & neccessary values are already validated
    const {name, content, image, categoryId} = req.body
    const type = "news" 
    Entry.create({ name, content, image, categoryId, type})
    .then(newEntry => res.status(200).send({success: true, message: "News created successfully.", createdNew: newEntry}))
    .catch(e => res.status(400).send({success: false, message: e.errors[0].message || e.name}))
}
