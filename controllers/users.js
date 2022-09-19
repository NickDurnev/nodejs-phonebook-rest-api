const service = require("../service/users");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { unauthorizedError } = require("../helpers/errors");

const registration = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await service.getUserByEmail(email);
  if (user) {
    next(createError(404, "Email in use"));
    return;
  }
  const avatar = gravatar.url(email, { s: "200" });
  const newUser = await service.userSignup(password, email, avatar);
  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

const login = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await service.getUserByEmail(email);
  if (!user) {
    next(createError(401, "Email or password is wrong"));
    return;
  }
  const isSamePassword = await bcrypt.compare(password, user.password);
  if (!isSamePassword) {
    next(createError(401, "Email or password is wrong"));
    return;
  }
  const payload = {
    id: user.id,
    email: user.email,
  };
  const updatedUser = await service.addToken(payload);
  res.status(200).json({
    token: updatedUser.token,
    user: {
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  });
};

const logout = async (req, res, next) => {
  const { token, email } = req.user;
  await service.userLogout(email, token);
  res.status(204).json({});
};

const currentUser = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
};

const updateSub = async (req, res, next) => {
  const { userId } = req.params;
  const { subscription } = req.body;
  const subscriptionTypes = ["starter", "pro", "business"];
  if (!subscriptionTypes.includes(subscription)) {
    next(createError(400, "Wrong subscription name"));
    return;
  }
  const updatedResult = await service.updateSubscription(userId, subscription);
  if (updatedResult) {
    res.status(200).json({
      data: {
        user: updatedResult,
      },
    });
  } else {
    next(unauthorizedError);
  }
};

module.exports = {
  registration,
  login,
  logout,
  currentUser,
  updateSub,
};
