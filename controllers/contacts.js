const createError = require("http-errors");
const service = require("../service/contacts");

const get = async (req, res, next) => {
  const { page = 1, limit = 20, favorite = null } = req.query;
  let skip = 0;
  page > 1 ? (skip = (page - 1) * limit) : (skip = 0);
  const results = await service.getAllContacts(
    parseInt(skip),
    parseInt(limit),
    favorite
  );
  if (results.length === 0) {
    res.json({
      status: "success",
      code: 200,
      data: "Contacts ended",
    });
    return;
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
  const result = await service.getContactByID(contactId);
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

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await service.removeContact(contactId);
  if (result) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    next();
  }
};

const create = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const result = await service.createContact({ name, email, phone });
  res.status(201).json({
    status: "success",
    data: {
      contact: result,
    },
  });
};

const update = async (req, res, next) => {
  const { email, name, phone } = req.body;
  const { contactId } = req.params;
  const result = await service.updateContact(contactId, {
    email,
    name,
    phone,
  });
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
  const updatedResult = await service.updateStatusContact(contactId, body);
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
  remove,
  create,
  update,
  updateStatus,
};
