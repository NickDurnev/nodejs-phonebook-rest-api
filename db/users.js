const User = require("../schemas/users");

const getByEmail = async (email) => await User.findOne({ email });

const signup = async (password, email) => {
  const newUser = new User({
    email,
    password,
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

module.exports = {
  getByEmail,
  signup,
  logout,
  token,
  updateSubs,
};
