const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SMPT_SERVICE,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.SMPT_MAIL, // sender address
    to: options.email , // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
    html: options.message, // html body
  });
};


module.exports = sendEmail;