const createError = require("http-errors");
const { contactService } = require("../service");
const { deleteImage } = require("../google-storage");

const {
  getAllContacts,
  getContactByID,
  getContactsByName,
  removeContact,
  createContact,
  updateContact,
  updateStatusContact,
} = contactService;

const get = async (req, res, next) => {
  const { page, limit = 10, favorite } = req.query;
  const { userID } = req.params;
  let skip = 0;
  page > 1 ? (skip = (page - 1) * limit) : (skip = 0);
  const results = await getAllContacts(
    userID,
    parseInt(skip),
    parseInt(limit),
    favorite
  );
  if (results.length === 0) {
    res.json({
      status: "success",
      code: 200,
      data: { contacts: [] },
      message: "Contacts ended",
    });
    return;
  }
  if (!results) {
    next();
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts: results,
    },
    page,
    limit,
  });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactByID(contactId);
  if (result) {
    res.status(200).json({
      status: "success",
      data: {
        contact: result,
      },
    });
  } else {
    next();
  }
};

const getByName = async (req, res, next) => {
  const { page, limit = 10 } = req.query;
  const { userID, contactName } = req.params;
  let skip = 0;
  page > 1 ? (skip = (page - 1) * limit) : (skip = 0);
  const results = await getContactsByName(
    userID,
    contactName,
    parseInt(skip),
    parseInt(limit)
  );
  if (results && results.length > 0) {
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
      page,
      limit,
    });
  } else {
    next();
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const removedContact = await removeContact(contactId);
  await deleteImage(removedContact.avatarURL);
  if (removedContact) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    next();
  }
};

const create = async (req, res, next) => {
  const { userID, name, phone } = req.body;
  const result = await createContact({ userID, name, phone });
  res.status(201).json({
    status: "success",
    data: {
      contact: result,
    },
  });
};

const update = async (req, res, next) => {
  const contact = req.body;
  const { contactId } = req.params;
  const result = await updateContact(contactId, contact);
  if (result) {
    res.status(200).json({
      data: {
        contact: result,
      },
    });
  } else {
    next();
  }
};

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  if (Object.keys(body).length === 0) {
    next(createError(400, "missing field favorite"));
    return;
  }
  const updatedResult = await updateStatusContact(contactId, body);
  if (updatedResult) {
    res.status(200).json({
      data: {
        contact: updatedResult,
      },
    });
  } else {
    next();
  }
};

module.exports = {
  get,
  getById,
  getByName,
  remove,
  create,
  update,
  updateStatus,
};
