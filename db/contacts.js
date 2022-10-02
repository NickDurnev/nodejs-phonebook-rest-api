const { Contact } = require("../schemas");

const get = async (userID, skip, limit, filter) =>
  await Contact.find({ userID: userID })
    .select({ __v: 0 })
    .skip(skip)
    .limit(limit)
    .sort(filter);

const getByID = async (id) => await Contact.findById({ _id: id });

const remove = async (id) => await Contact.findByIdAndRemove({ _id: id });

const create = async ({ userID, name, phone }) =>
  await Contact.create({ userID, name, phone });

const update = async (id, fields) =>
  await Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });

const updateStatus = async (id, favorite) =>
  await Contact.findByIdAndUpdate(
    { _id: id },
    { $set: { favorite: favorite } },
    { new: true }
  );

const updateAvatar = async (contactID, avatarURL) =>
  await Contact.findOneAndUpdate(
    { _id: contactID },
    {
      $set: {
        avatarURL,
      },
    },
    { new: true }
  ).select({ avatarURL: 1 });

module.exports = {
  get,
  getByID,
  remove,
  create,
  update,
  updateStatus,
  updateAvatar,
};
