const { dbContacts } = require("../db");
const isValid = require("mongoose").Types.ObjectId.isValid;

const getAllContacts = async (skip, limit, favorite) => {
  let filter = null;
  if (favorite) {
    filter = { favorite: -1 };
  }
  return await dbContacts.get(skip, limit, filter);
};

const getContactByID = async (id) => {
  if (!isValid(id)) return false;
  return await dbContacts.getByID(id);
};

const removeContact = async (id) => {
  if (!isValid(id)) return false;
  return await dbContacts.remove(id);
};

const createContact = async ({ name, email, phone }) =>
  await dbContacts.create({ name, email, phone });

const updateContact = async (id, fields) => {
  if (!isValid(id)) return false;
  return await dbContacts.update(id, fields);
};

const updateStatusContact = async (id, body) => {
  if (!isValid(id)) return false;
  const { favorite } = body;
  return await dbContacts.updateStatus(id, favorite);
};

module.exports = {
  getAllContacts,
  getContactByID,
  removeContact,
  createContact,
  updateContact,
  updateStatusContact,
};
