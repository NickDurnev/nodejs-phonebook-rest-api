const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const { dbUsers } = require("../db");
const bcrypt = require("bcryptjs");
const { customAlphabet } = require("nanoid");
require("dotenv").config();
const isValid = require("mongoose").Types.ObjectId.isValid;

const secret = process.env.SECRET;
const emailSender = process.env.EMAIL_SENDER;
const BASE_URL = "https://phonebook-node-jss.herokuapp.com";

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

const sendVerifyEmail = async (email, verToken) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: `${email}`, // Change to your recipient
    from: `${emailSender}`, // Change to your verified sender
    subject: "Phonebook email verification",
    text: "Link for email verification",
    html: `<h2>Plaease, verify your email by following this link</h2><a href=${BASE_URL}/users/verify/${verToken}>Click me</a>`,
  };
  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
};

const sendResetPasswordEmail = async (email, token) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: `${email}`, // Change to your recipient
    from: `${emailSender}`, // Change to your verified sender
    subject: "Phonebook reset password",
    text: "Link for reset password",
    html: `<h2>You can reset your password by following this link</h2><a href=${BASE_URL}/users/res_password/${token}>Click me</a>`,
  };
  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
};

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
  sendVerifyEmail,
  addResetPasswordToken,
  sendResetPasswordEmail,
  resetUserPassword,
};
