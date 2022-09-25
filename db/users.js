const { User } = require("../schemas");

const getByEmail = async (email) => await User.findOne({ email });

const getbyVerificationToken = async (token) =>
  await User.findOne({ verificationToken: token });

const getbyResetPasswordToken = async (token) =>
  await User.findOne({ resetPasswordToken: token });

const signup = async (password, email, avatar, verToken) => {
  const newUser = new User({
    email,
    password,
    avatarURL: avatar,
    verificationToken: verToken,
  });
  const savedUser = await newUser.save();
  return savedUser;
};

const logout = async (email, token) =>
  await User.findOneAndUpdate({ email: email }, { $unset: { token: token } });

const token = async (id, token) =>
  await User.findByIdAndUpdate(
    { _id: id },
    { $set: { token: token } },
    { new: true }
  );

const updateSubs = async (id, subscription) =>
  await User.findByIdAndUpdate(
    { _id: id },
    { $set: { subscription: subscription } },
    { new: true }
  ).select({ email: 1, subscription: 1 });

const updateAvatar = async (email, avatarURL) =>
  await User.findOneAndUpdate(
    { email: email },
    {
      $set: {
        avatarURL: avatarURL,
      },
    },
    { new: true }
  ).select({ avatarURL: 1 });

const updateVerification = async (id) =>
  await User.findByIdAndUpdate(
    { _id: id },
    { $set: { verificationToken: null, verify: true } }
  );

const updateResetPasswordToken = async (email, token) =>
  await User.findOneAndUpdate(
    { email: email },
    {
      $set: { resetPasswordToken: token },
    },
    { new: true }
  ).select({ resetPasswordToken: 1 });

const resetPassword = async (id, password) =>
  await User.findByIdAndUpdate(
    { _id: id },
    { $set: { resetPasswordToken: null, password: password } }
  );

module.exports = {
  getByEmail,
  getbyVerificationToken,
  getbyResetPasswordToken,
  signup,
  logout,
  token,
  updateSubs,
  updateAvatar,
  updateVerification,
  updateResetPasswordToken,
  resetPassword,
};
