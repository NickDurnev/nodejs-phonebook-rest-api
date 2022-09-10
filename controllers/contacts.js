const service = require("../service");

const get = async (req, res, next) => {
  try {
    const results = await service.getAllContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await service.getContactByID(contactId);
    if (result) {
      res.status(200).json({
        status: "success",
        data: {
          contact: result,
        },
      });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await service.removeContact(contactId);
    if (result) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const create = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const result = await service.createContact({ name, email, phone });
    res.status(201).json({
      status: "success",
      data: {
        contact: result,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  const { email, name, phone } = req.body;
  const { contactId } = req.params;
  try {
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
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  if (Object.keys(body).length === 0) {
    res.status(400).json({ message: "missing field favorite" });
    return;
  }
  try {
    const updatedResult = await service.updateStatusContact(contactId, body);
    if (updatedResult) {
      res.status(200).json({
        data: {
          contact: updatedResult,
        },
      });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.log(error);
    next(error);
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
