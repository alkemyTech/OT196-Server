const db = require("../models/index");
const { Entry } = db;

const Newscontroller = async function (req, res) {
    // Save id from params 
    const { idNews } = req.params;
    // Req.Body for updates
    const { name, content, image, type } = req.body;
    // Find de element to update by primary Key
    const newUpdate = await Entry.findByPk(idNews);

    // Validate if element exists
    if (newUpdate === null) {
        return res.status(404).json({
            success: false,
            msj: 'No se encontró ninguna noticia',       
        });
    } else {
        const updatedNews = await Entry.update({
            name,
            content,
            image,
            type
        },
        // Returning for return the object
        { returning: true, where: { id: idNews } })
        res.status(200).send(`La noticia Nº${idNews} fue modificada. Actualizado con: name: ${name} content: ${content} image: ${image} type: ${type}`);
    }

}

module.exports = Newscontroller;