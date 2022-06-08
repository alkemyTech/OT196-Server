var express = require("express");
const validateTest = require("../controllers/validateTestimony");
var router = express.Router();

const db = require("../models/index");

// Add Testimony's Model
const { Testimony } = db;

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
