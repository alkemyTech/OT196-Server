const { members } = require("../models/index");

// Controller DELETE member
exports.deleteMember = async (req, res) => {
    try { 
        //Select member and try delete
        await members.destroy({ where: { id: req.params.id }, returning: true})
        .then( 
            //if found and deleted the member, send response status
            rowsDestroyed => rowsDestroyed ? 
            res.status(200).json({
                message: '¡Miembro eliminado con éxito!'
            }) 
            : 
            //else if not found, send response not found member
            res.status(404).json({ 
                success: false, 
                message: 'El miembro que está buscando no se encuentra en la lista' 
            })
        )
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message
        })
      }
}

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