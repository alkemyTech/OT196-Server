var express = require("express");
const validateTest = require("../controllers/validateTestimony");
const { validateUpdateTestimony } = require("../middlewares/validators/formsValidator");
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
      content: req.body.content,
      id: req.body.id 
    })
    .then(result =>  res.json(result))
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
})

//ROUTE AND FUNCTION FOR UPDATE A TESTIMONIAL   
router.put('/:id', validateUpdateTestimony , async (req, res)=> {
  const { id } = req.params
  const { name, content } = req.body 
  try {
    const testimonyUpdate = await Testimony.update(
      { name: name, content: content }, 
      { where: { id: id } },          
    )
    testimonyUpdate[0] !== 0 ? res.send(req.body) : 
    res.status(404).send('testimonial not found in the database')
    
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

module.exports = router;
