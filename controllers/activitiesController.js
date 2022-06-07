const { Activity } = require('../models/index')

exports.updateActivity = async function(req, res){
    const { id } = req.params
    const { name, image, content } = req.body

    await Activity.update({name: name, image: image, content: content}, {where: {id: id}, returning: true})
    .then(async () => {
        // Get result after success update.
        const updatedActivity = await Activity.findByPk(id) 
        res.status(200).send({ok: true, message: 'Activity updated.', newData: updatedActivity})
    })
    .catch((e) => res.status(500).send({ok: false, message: 'Cant update activity.', error: e.original?.sqlMessage || e.name || "Error on update."}))
    
}