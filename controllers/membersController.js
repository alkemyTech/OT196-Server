const { members } = require("../models/index");

exports.createMember = async(req, res) => {
    try {
        await members.create({
            name: req.body.name,
            image: req.body.image || ''
        })
        res.status(200).json({
            success: true,
            message: '¡Nuevo miembro creado con éxito!'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateMember = async(req, res)=> {
    try {
        const { id } = req.params
        const { name, image } = req.body
        await members.update(
            { name, image },  
            { where: { id } }
        )
        res.json({
            success: true,
            message: 'Miembro actualizado con éxito', 
    })
    } catch (error) {
        res.status(500).json(error.message)
    }
}



