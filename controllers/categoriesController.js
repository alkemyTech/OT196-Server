const { category } = require('../models/index')

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    const objectToDelete = await category.findByPk(id);
    if(objectToDelete === null){
        res.status(404).json({ 
            success: false, 
            message: 'This category is not in the list' 
        })
    } else {
        try {
            category.destroy({ where: { id }})
            res.send('Deleted category successfull!')
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: error.message
            })
        }

    }
}