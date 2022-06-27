var express = require("express");
var router = express.Router();
const { uploadImage } = require("../controllers/imagesController");
const { adminValidation } = require("../middlewares/validators/userValidators");


router.post("/", express.json({limit: "2mb"}), uploadImage);

module.exports = router;
