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

exports.createCategory = async (req, res) => {
  const { name, description } = req.body;

  newCategory = await Category.create({name: name, description: description || ""})
  .then(res.status(200).send({success: true, message: `The category ${name} has been created.`, result: newCategory}))
  .catch(res.status(500).send({success: false, message: `Error on create new category.`}))
}