const jwt = require("jsonwebtoken");
const { unauthorizedError } = require("../helpers/errors");
require("dotenv").config();

const secret = process.env.SECRET;

const tokenVerification = async (req, res, next) => {
  if (!req.headers.authorization) {
    next();
    return;
  }
  // eslint-disable-next-line no-unused-vars
  const [tokenType, token] = req.headers.authorization.split(" ");
  try {
    jwt.verify(token, secret);
    next();
  } catch (error) {
    next(unauthorizedError);
  }
};

module.exports = tokenVerification;
