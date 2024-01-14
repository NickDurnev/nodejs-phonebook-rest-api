const jwt = require("jsonwebtoken");
const { dbUsers } = require("../db");
const bcrypt = require("bcryptjs");
const { customAlphabet } = require("nanoid");
require("dotenv").config();
const isValid = require("mongoose").Types.ObjectId.isValid;
const { sendVerifyEmail } = require("../helpers/sendEmail");

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
