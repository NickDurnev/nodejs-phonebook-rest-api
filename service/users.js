const jwt = require("jsonwebtoken");
const { dbUsers } = require("../db");
const bcrypt = require("bcryptjs");
const { customAlphabet } = require("nanoid");
require("dotenv").config();
const isValid = require("mongoose").Types.ObjectId.isValid;

const secret = process.env.SECRET;

const getUserByEmail = async (email) => await dbUsers.getByEmail(email);

const getUserByVerificationToken = async (token) =>
  await dbUsers.getbyVerificationToken(token);

const getUserByResetPasswordToken = async (token) =>
  await dbUsers.getbyResetPasswordToken(token);

const userSignup = async (password, email, name, avatar) => {
  const nanoid = customAlphabet("1234567890abcdef", 16);
  const verToken = nanoid();
  sendVerifyEmail(email, verToken);
  return await dbUsers.signup(password, email, name, avatar, verToken);
};

const userLogout = async (email, token) => await dbUsers.logout(email, token);

const addToken = async (payload) => {
  const { id } = payload;
  if (!isValid(id)) return false;
  const token = jwt.sign(payload, secret, { expiresIn: "1d" });
  return await dbUsers.token(id, token);
};

const addResetPasswordToken = async (email) => {
  const nanoid = customAlphabet("1234567890abcdef", 24);
  const token = nanoid();
  return await dbUsers.updateResetPasswordToken(email, token);
};

const updateSubscription = async (id, subscription) => {
  if (!isValid(id)) return false;
  return await dbUsers.updateSubs(id, subscription);
};

// const sendVerifyEmail = async (email, verToken) => {
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//   const msg = {
//     to: `${email}`, // Change to your recipient
//     from: `${emailSender}`, // Change to your verified sender
//     templateId: "d-9ce58db3f70f4dd5832e7dd6d75f28c6",
//     dynamic_template_data: {
//       subject: "Phonebook email verification",
//       text: `Verify your email to join our family 🤗`,
//       link: `${BASE_FRONT_END_URL}login/${verToken}`,
//     },
//   };
//   try {
//     await sgMail.send(msg);
//     console.log("Email sent");
//   } catch (error) {
//     console.error(error);
//   }
// };

// const sendResetPasswordEmail = async (email, token, name) => {
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//   const msg = {
//     to: `${email}`, // Change to your recipient
//     from: `${emailSender}`, // Change to your verified sender
//     templateId: "d-9ce58db3f70f4dd5832e7dd6d75f28c6",
//     dynamic_template_data: {
//       subject: "Phonebook reset password",
//       text: `Hi, ${name}. You can change your password 😉`,
//       link: `${BASE_FRONT_END_URL}password/${token}`,
//     },
//   };
//   try {
//     await sgMail.send(msg);
//     console.log("Email sent");
//   } catch (error) {
//     console.error(error);
//   }
// };

const updateUserVerification = async (id) =>
  await dbUsers.updateVerification(id);

const resetUserPassword = async (id, password) => {
  const cryptedPassword = await bcrypt.hash(password, 10);
  return await dbUsers.resetPassword(id, cryptedPassword);
};

module.exports = {
  getUserByEmail,
  getUserByVerificationToken,
  getUserByResetPasswordToken,
  userSignup,
  userLogout,
  addToken,
  updateSubscription,
  updateUserVerification,
  addResetPasswordToken,
  resetUserPassword,
};
