const news = async function (req, res) {
    // Save id from params 
    const idParams = req.params.id;
    const { name, content, image, type } = req.body;


    if (newUpdate == null) {
        return res.json({
            success: false,
            msj: 'No se encontró ninguna noticia',
            err
        });
    } else {
        const updatedNews = await news.update({
            name,
            content,
            image,
            type
        },

            { returning: true, where: { id: idParams } })
        res.status(200).send(`La noticia Nº${id} fue modificada`);    
    }

};

export default news;