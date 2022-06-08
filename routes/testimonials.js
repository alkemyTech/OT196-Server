const e = require("express");
var express = require("express");
var router = express.Router();
const { adminValidation } = require("../middlewares/validators/userValidators");

const db = require("../models/index");

// Add Testimony's Model
const { Testimony } = db;

// GET all Testimonials' information
router.get("/", adminValidation, async (req, res, next) => {
  try {
    // Get data from DB
    const allTestimonials = await Testimony.findAll({
      attributes: [
        "id",
        "name",
        "content",
        "image",
      ],
    });
    res.json(allTestimonials);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// Endpoint DELETE data
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    //Select data to delete
    await Testimony.destroy({
      where: { id }       
    })
    res.send('The testimony has been deleted correctly');
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
})

module.exports = router;
