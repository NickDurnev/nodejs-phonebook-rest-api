const jwt = require("jsonwebtoken");
const User = require("../schemas/users");
const createError = require("http-errors");
const { unauthorizedError } = require("../helpers/errors");
require("dotenv").config();

const secret = process.env.SECRET;

const authMiddleware = async (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const [tokenType, token] = req.headers.authorization.split(" ");
  if (tokenType !== "Bearer") {
    next(createError(400, "Token type is wrong. Must be a Bearer"));
    return;
  }
  try {
    const user = jwt.decode(token, secret);
    if (!user) {
      next(unauthorizedError);
      return;
    }
    const searchUser = await User.findById({ _id: user.id });
    if (searchUser.token !== token) {
      next(unauthorizedError);
      return;
    }
    req.user = searchUser;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { authMiddleware };
