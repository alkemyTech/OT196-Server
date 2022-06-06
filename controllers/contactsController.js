const { sendEmail } = require("../utils/emailSender");
const { Contact } = require("../models/index");

exports.createContact = async function (req, res) {
  const { name, email, phone, message } = req.body;
  // Trying create new contact
  try {
    const newContact = await Contact.create({
      name: name,
      email: email,
      phone: phone || "",
      message: message || "",
    });

    // Response on success request
    if (newContact) {
      sendEmail({ email, name }, "contact");
      return res.status(200).send({
        ok: true,
        message: "Contact created.",
        newContact: newContact,
      });
    }
  } catch (e) {
    // Response with error on fail request
    return res.status(400).send({
      ok: false,
      message: "Error creating contact.",
      error: e.parent?.sqlMessage || e.name,
    });
  }
};
