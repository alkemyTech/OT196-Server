const { members } = require("../models/index");

exports.deleteMember = async (req, res) => {
    try {
        await members.destroy({ where: { id: req.params.id }, returning: true})
        .then(
            rowsDestroyed => rowsDestroyed ? 
            res.status(200).json({
                message: 'Deleted member successfull!'
            }) 
            : 
            res.status(404).json({ 
                success: false, 
                message: 'This member does not exist in the list' 
            })
        )
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message
        })
    }
}