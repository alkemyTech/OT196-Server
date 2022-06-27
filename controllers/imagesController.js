const { uploadFile } = require("../utils/uploadFileS3")

exports.uploadImage = async (req, res, next) => {
    const { image, name } = req.body
    try{
        uploadData = await uploadFile(image, name)
        res.send(uploadData.Location)
    }
    catch(e){
        res.status(500).send({success: false, message: 'No se ha podido subir la imagen.'})
    }
}