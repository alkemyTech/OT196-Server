// Add Testimony's Model
const { Testimony } = require("../models/index");

// GET all Testimonials' information
exports.getAllTestimonials = async (req, res, next) => {
  try {
    // Get data from DB
    const allTestimonials = await Testimony.findAll({
      attributes: [
        "firstName",
        "lastName",
        "image",
        "phone",
        "address",
        "welcomeText",
      ],
    });

    res.json(allTestimonials);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// Create a new Testimony
exports.createTestimony = (req, res) => {
  try {
    Testimony.create({
      name: req.body.name,
      content: req.body.content,
    }).then((result) => res.json(result));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
