const sgMail = require("@sendgrid/mail");
const formatMessage = require("format-message");
formatMessage.setup({ missingTranslation: "ignore" });

// Set API KEY for SENDGRID
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Set EMAIL SENDER validated on SENDGRID
const emailSender = "";

const emailTemplates = {
  ["default"]: {
    subject: "{subject} - ONG Somos Mas",
    html: "<h2>Hola, {name}</h2></br> {text}",
  },
  ["register"]: {
    subject: "{name} - Tu cuenta ha sido creada! - ONG Somos Mas",
    html: "<h2>Hola, {name}</h2></br> <h3>Bienvenido a nuestra página web.</h3></br> Tu cuenta ha sido creada con exito</br> Si tienes alguna duda contacta a mail@example.com",
  },
  ["contact"]: {
    subject: "{name} - Consulta recibida - ONG Somos Mas",
    html: "<h2>Hola, {name}</h2></br> Hemos recibido tu consulta, muchas gracias por contactarnos. Te responderemos a la brevedad!",
  },
};

exports.sendEmail = async function (mailData, type) {
  const template =
    (type && emailTemplates[type.toLowerCase()]) || emailTemplates["default"];
  const subject = formatMessage(template.subject, {
    name: mailData.name,
    subject: mailData.subject,
  });
  const html = formatMessage(template.html, {
    name: mailData.name,
    text: mailData.text,
  });
  const msg = {
    to: mailData.email,
    from: emailSender,
    subject: subject,
    html: html,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log(`Email sent to ${mailData.email} from ${emailSender}`);
    })
    .catch((e) => {
      console.error(e);
    });
};
