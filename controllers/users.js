const { userService } = require("../service");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { unauthorizedError } = require("../helpers/errors");
const {
  sendVerifyEmail,
  sendResetPasswordEmail,
} = require("../helpers/sendEmail");

const {
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
} = userService;

const registration = async (req, res, next) => {
  const { password, email, name } = req.body;
  const user = await getUserByEmail(email);
  if (user) {
    next(createError(404, "Email in use"));
    return;
  }
  const avatar = gravatar.url(email, { s: "200" });
  const newUser = await userSignup(password, email, name, avatar);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      verify: newUser.verify,
    },
  });
};

const login = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await getUserByEmail(email);
  if (!user) {
    next(createError(401, "Email or password is wrong"));
    return;
  }
  const isSamePassword = await bcrypt.compare(password, user.password);
  if (!isSamePassword) {
    next(createError(401, "Email or password is wrong"));
    return;
  }
  if (!user.verify) {
    next(createError(401, "Verify your email"));
    return;
  }
  const payload = {
    id: user.id,
    email: user.email,
  };
  const updatedUser = await addToken(payload);
  res.status(200).json({
    token: updatedUser.token,
    user: {
      id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
      verify: updatedUser.verify,
      subscription: updatedUser.subscription,
    },
  });
};

const logout = async (req, res, next) => {
  const { token, email } = req.user;
  await userLogout(email, token);
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
  const updatedResult = await updateSubscription(userId, subscription);
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

const verification = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await getUserByVerificationToken(verificationToken);
  if (!user) {
    next();
    return;
  }
  if (user) {
    const result = await updateUserVerification(user._id);
    if (result) {
      res.status(200).json({ message: "Verification successful" });
    }
  }
};

const resendEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    next(createError(400, "Missing required field email"));
    return;
  }
  const user = await getUserByEmail(email);
  if (!user) {
    next();
    return;
  }
  if (user.verify) {
    next(createError(400, "Verification has already been passed"));
    return;
  }
  await sendVerifyEmail(email, user.verificationToken, user.name);
  res.status(200).json({ message: "Verification email sent" });
};

const updateResetPasswordToken = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    next(createError(400, "Missing required field email"));
    return;
  }
  const { resetPasswordToken, name } = await addResetPasswordToken(email);
  if (!resetPasswordToken) {
    next();
    return;
  }
  await sendResetPasswordEmail(email, resetPasswordToken, name);
  res.status(200).json({ message: "Reset password email sent" });
};

const resetPassword = async (req, res, next) => {
  const { resetPasswordToken } = req.params;
  const { password } = req.body;
  if (!password) {
    next(createError(400, "Missing required field password"));
    return;
  }
  const user = await getUserByResetPasswordToken(resetPasswordToken);
  if (!user) {
    next();
    return;
  }
  if (user) {
    const result = await resetUserPassword(user._id, password);
    if (result) {
      res.status(200).json({ message: "Password has been changed" });
    }
  }
};

module.exports = {
  registration,
  login,
  logout,
  currentUser,
  updateSub,
  verification,
  resendEmail,
  updateResetPasswordToken,
  resetPassword,
};
