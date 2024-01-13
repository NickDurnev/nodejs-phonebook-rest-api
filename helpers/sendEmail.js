const nodemailer = require("nodemailer");
const createEmail = require("./createEmail");

const EMAIL_SENDER = process.env.EMAIL_SENDER;
const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD;
const BASE_FRONT_END_URL = process.env.BASE_FRONT_END_URL;

async function sendVerifyEmail(email, token, name) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_SENDER,
      pass: EMAIL_APP_PASSWORD,
    },
  });

  // Define the data to be passed to the template
  const templateData = {
    link: `${BASE_FRONT_END_URL}login/${token}`,
    name,
    text: "To finish signing up, please confirm your email address. This ensures we have the right email in case we need to contact you.",
  };

  const html = createEmail(templateData, "./templates/verifyEmail.hbs");

  const mailOptions = {
    from: EMAIL_SENDER,
    to: email,
    subject: "Phonebook email verification",
    html: html,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

async function sendResetPasswordEmail(email, token, name) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_SENDER,
      pass: EMAIL_APP_PASSWORD,
    },
  });

  // Define the data to be passed to the template
  const templateData = {
    link: `${BASE_FRONT_END_URL}password/${token}`,
    name,
    text: `Hi, ${name}. You can change your password 😉`,
  };

  const html = createEmail(templateData, "./templates/verifyEmail.hbs");

  const mailOptions = {
    from: EMAIL_SENDER,
    to: email,
    subject: "Phonebook reset password",
    html: html,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

module.exports = { sendVerifyEmail, sendResetPasswordEmail };
