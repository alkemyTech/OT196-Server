// Add Categories' Model
const { Category } = require("../models/index");

exports.updateCategory = async (req, res) => {
  // Get id from params
  const { id } = req.params;
  // Get the values to update
  const { name, description } = req.body;

  try {
    // Update the category
    const modifiedCategory = await Category.update(
      {
        name,
        description,
      },
      { where: { id: id } }
    );
    if (modifiedCategory != 0) {
      res.status(200).send({
        success: true,
        message: "The category has been updated.",
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "The category to be modified does not exist",
      });
    }
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    const objectToDelete = await Category.findByPk(id);
    if(objectToDelete === null){
        res.status(404).json({ 
            success: false, 
            message: 'This category is not in the list' 
        })
    } else {
        try {
            Category.destroy({ where: { id }})
            res.send('Deleted category successfull!')
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: error.message
            })
        }

    }
}