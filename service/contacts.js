const db = require("../db/contacts");
const isValid = require("mongoose").Types.ObjectId.isValid;

const getAllContacts = async (skip, limit, favorite) => {
  let filter = null;
  if (favorite) {
    filter = { favorite: -1 };
  }
  return await db.get(skip, limit, filter);
};

const getContactByID = async (id) => {
  if (!isValid(id)) return false;
  return await db.getByID(id);
};

const removeContact = async (id) => {
  if (!isValid(id)) return false;
  return await db.remove(id);
};

const createContact = async ({ name, email, phone }) =>
  await db.create({ name, email, phone });

const updateContact = async (id, fields) => {
  if (!isValid(id)) return false;
  return await db.update(id, fields);
};

const updateStatusContact = async (id, body) => {
  if (!isValid(id)) return false;
  const { favorite } = body;
  return await db.updateStatus(id, favorite);
};

module.exports = {
  getAllContacts,
  getContactByID,
  removeContact,
  createContact,
  updateContact,
  updateStatusContact,
};
