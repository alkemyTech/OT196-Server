var express = require("express");
const validateTest = require("../controllers/validateTestimony");
var router = express.Router();

const db = require("../models/index");

// Add Testimony's Model
const { Testimony } = db;

// GET all Testimonials' information
router.get("/1/public", async (req, res, next) => {
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

    // Name will be the union between firstName and lastName
    allTestimonials[0].dataValues.name =
      allTestimonials[0].dataValues.firstName +
      " " +
      allTestimonials[0].dataValues.lastName;

    res.json(allTestimonials);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.post('/', validateTest, (req, res) => {
  try {
    Testimony.create({
      name: req.body.name,
      content: req.body.content
    })
    .then(result =>  res.json(result))
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
})

module.exports = router;
