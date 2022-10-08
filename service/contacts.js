const { dbContacts } = require("../db");
const isValid = require("mongoose").Types.ObjectId.isValid;

const getAllContacts = async (userID, skip, limit, favorite) => {
  let filter = null;
  if (favorite) {
    filter = { favorite: true };
  }
  return await dbContacts.get(userID, skip, limit, filter);
};

const getContactByID = async (id) => {
  if (!isValid(id)) return false;
  return await dbContacts.getByID(id);
};

const removeContact = async (id) => {
  if (!isValid(id)) return false;
  return await dbContacts.remove(id);
};

const createContact = async ({ userID, name, phone }) =>
  await dbContacts.create({ userID, name, phone });

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
