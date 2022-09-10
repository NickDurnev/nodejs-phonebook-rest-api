const Contact = require("./schemas/contacts");
const isValid = require("mongoose").Types.ObjectId.isValid;

const getAllContacts = async () => await Contact.find({});

const getContactByID = async (id) => {
  if (!isValid(id)) return false;
  return await Contact.findById({ _id: id });
};

const removeContact = async (id) => {
  if (!isValid(id)) return false;
  return await Contact.findByIdAndRemove({ _id: id });
};

const createContact = async ({ name, email, phone }) =>
  await Contact.create({ name, email, phone });

const updateContact = async (id, fields) => {
  if (!isValid(id)) return false;
  return await Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const updateStatusContact = async (id, body) => {
  if (!isValid(id)) return false;
  const { favorite } = body;
  return await Contact.findByIdAndUpdate(
    { _id: id },
    { $set: { favorite: favorite } },
    { new: true }
  );
};

module.exports = {
  getAllContacts,
  getContactByID,
  removeContact,
  createContact,
  updateContact,
  updateStatusContact,
};
