var express = require("express");
const {
  getAllTestimonials,
  createTestimony,
  deleteTestimony,
} = require("../controllers/testimonialsController");
const validateTest = require("../controllers/validateTestimony");
const { validateUpdateTestimony } = require("../middlewares/validators/formsValidator");
var router = express.Router();
const { adminValidation } = require("../middlewares/validators/userValidators");
const { Testimony } = require('../models/index');

router.get("/", getAllTestimonials);
router.post("/", validateTest, createTestimony);
router.delete("/:id", adminValidation, deleteTestimony);

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
