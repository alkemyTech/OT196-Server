const sgMail = require('@sendgrid/mail')
const formatMessage = require('format-message')

// Set API KEY for SENDGRID 
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Set EMAIL SENDER validated on SENDGRID
const emailSender = "facugastonbarral@gmail.com"

const emailTemplates = {
    ["default"]: {
        subject: '{name} - ONG Somos Mas',
        html: '<h2>Hola, {name}</h2></br> Esto es un texto de prueba.</br> Si tienes alguna duda contacta a mail@example.com',
    },
    ["register"]: {
        subject: '{name} - Tu cuenta ha sido creada! - ONG Somos Mas',
        html: '<h2>Hola, {name}</h2></br> <h3>Bienvenido a nuestra página web.</h3></br> Tu cuenta ha sido creada con exito</br> Si tienes alguna duda contacta a mail@example.com',
    },
    ["contact"]: {
        subject: '{name} - Consulta recibida - ONG Somos Mas',
        html: '<h2>Hola, {name}</h2></br> Hemos recibido tu consulta, te responderemos a la brevedad!',
    },
}

exports.sendEmail = async function (receiverEmail, receiverName, type){
    const template = (type && emailTemplates[type.toLowerCase()]) || emailTemplates["default"]
    const subject = formatMessage(template.subject, { name: receiverName })
    const html = formatMessage(template.html, { name: receiverName })
    const msg = {
        to: receiverEmail,
        from: emailSender,
        subject: subject,
        html: html,
    }
    sgMail.send(msg)
    .catch((e) => {
       console.error(e)
    })
}
