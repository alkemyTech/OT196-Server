const { Entry } = require('../models/index')

exports.createNews = async function( req, res ){
    const {name, content, image, categoryId} = req.body
    const type = "news"
    const createdNew = await Entry.create({ name, content, image, categoryId, type})
    res.status(200).send({success: true, message: "News created successfully.", createdNew: createdNew})
}
