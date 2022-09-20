const jwt = require("jsonwebtoken");
const db = require("../db/users");
require("dotenv").config();
const isValid = require("mongoose").Types.ObjectId.isValid;

const secret = process.env.SECRET;

const getUserByEmail = async (email) => await db.getByEmail(email);

const userSignup = async (password, email, avatar) =>
  await db.signup(password, email, avatar);

const userLogout = async (email, token) => await db.logout(email, token);

const addToken = async (payload) => {
  const { id } = payload;
  if (!isValid(id)) return false;
  const token = jwt.sign(payload, secret, { expiresIn: "1d" });
  return await db.token(id, token);
};

const updateSubscription = async (id, subscription) => {
  if (!isValid(id)) return false;
  return await db.updateSubs(id, subscription);
};

module.exports = {
  getUserByEmail,
  userSignup,
  userLogout,
  addToken,
  updateSubscription,
};
