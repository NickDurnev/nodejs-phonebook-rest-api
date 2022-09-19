const User = require("../schemas/users");

const getByEmail = async (email) => await User.findOne({ email });

const signup = async (password, email, avatar) => {
  console.log(avatar);
  const newUser = new User({
    email,
    password,
    avatarURL: avatar,
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

module.exports = {
  getByEmail,
  signup,
  logout,
  token,
  updateSubs,
  updateAvatar,
};
