const { Contact } = require('../models/index')

exports.createContact = async function(req, res){
    const { name, email, phone, message } = req.body
    // Trying create new contact
    try{
        const newContact = await Contact.create({
            name: name,
            email: email,
            phone: phone || "",
            message: message || ""
        })
    }
    catch{
        if (!newContact) return res.status(404).send({ok: false, message: 'Error creating contact.'})
    }
    // Response on success request
    if (newContact) return res.status(200).send({ok: true, message: 'Contact created.', newContact: newContact})
}
