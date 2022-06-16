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



