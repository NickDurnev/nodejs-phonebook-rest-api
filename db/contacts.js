const { Contact } = require("../schemas");

const get = async (skip, limit, filter) =>
  await Contact.find({})
    .select({ __v: 0 })
    .skip(skip)
    .limit(limit)
    .sort(filter);

const getByID = async (id) => await Contact.findById({ _id: id });

const remove = async (id) => await Contact.findByIdAndRemove({ _id: id });

const create = async ({ name, email, phone }) =>
  await Contact.create({ name, email, phone });

const update = async (id, fields) =>
  await Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });

const updateStatus = async (id, favorite) =>
  await Contact.findByIdAndUpdate(
    { _id: id },
    { $set: { favorite: favorite } },
    { new: true }
  );

module.exports = {
  get,
  getByID,
  remove,
  create,
  update,
  updateStatus,
};
