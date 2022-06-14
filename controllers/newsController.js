const db = require("../models/index");
const { Entry } = db;

exports.UpdateNews = async function (req, res) {
    // Save id from params 
    const { idNews } = req.params;
    // Req.Body for updates
    const { name, content, image, type } = req.body;

    // Update the element
    const ModifyNew = await Entry.update({
        name,
        content,
        image,
        type
    },{ returning: true, where: { id: idNews } })

    // Validate if element exists
    if (ModifyNew === null) {
        return res.status(404).json({
            success: false,
            msj: 'No se encontró ninguna noticia',       
        });
    } else {  
        res.status(200).send(`La noticia Nº${idNews} fue modificada. Actualizado con: name: ${name} content: ${content} image: ${image} type: ${type}`);
    }
}

exports.createNews = async function( req, res ){
    // Admin role & neccessary values are already validated
    const {name, content, image, categoryId} = req.body
    const type = "news" 
    Entry.create({ name, content, image, categoryId, type})
    .then(newEntry => res.status(200).send({success: true, message: "News created successfully.", createdNew: newEntry}))
    .catch(e => res.status(400).send({success: false, message: e.errors[0].message || e.name}))
}

