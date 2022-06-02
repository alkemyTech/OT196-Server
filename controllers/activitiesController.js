const { Activity } = require('../models/index')

exports.updateActivity = async function(req, res){
    const { id } = req.params
    const { name, image, content } = req.body

    //Check if Activity exists
    updActivity = Activity.findByPk(id)
    if (!updActivity) return res.status(404).send({ok: false, message: 'Activity not found.'})

    try{
        await updActivity.update({
            name: name,
            image: image,
            content: content,
        });
    }
    catch(e){
        if (!updActivity) return res.status(404).send({ok: false, message: 'Error updating activity.'})
    }

    if (!updActivity) return res.status(200).send({ok: true, message: 'Activity updated.'})
}
