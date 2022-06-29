var express = require("express");
var router = express.Router();
const { uploadImage } = require("../controllers/imagesController");
const { validateImage } = require("../middlewares/validators/formsValidator");
const { adminValidation } = require("../middlewares/validators/userValidators");

router.post("/", express.json({limit: "2mb"}), validateImage, uploadImage);

module.exports = router;
