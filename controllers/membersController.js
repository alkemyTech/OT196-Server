const { members } = require('../models/index');

//This controller GET all members from database
exports.getMembers = async(req, res) => {
    try {
        const allMembers =
        await members.findAll({
            attributes: [
                'name',
                'image'
            ]
        });
        res.status(200).json({ allMembers })
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message
        })
    }
}