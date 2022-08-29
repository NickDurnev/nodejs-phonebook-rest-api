const express = require("express");
const methods = require("../../models/contacts");
const schema = require("../../models/contactsSchema");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await methods.listContacts();
  res.status(200).json({ status: "success", code: 200, data: contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await methods.getContactById(contactId);
  contact
    ? res.status(200).json({ status: "success", data: contact })
    : res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  const validation = schema.schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({ message: "missing required name field" });
  }
  const contact = await methods.addContact(req.body);
  res.status(201).json({ status: "success", data: contact });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await methods.removeContact(contactId);
  contact
    ? res.status(200).json({ message: "contact deleted" })
    : res.status(404).json({ message: "Not found" });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const validation = schema.schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({ message: "missing fields" });
  }
  const contact = await methods.updateContact(contactId, req.body);
  contact
    ? res.status(200).json({ data: contact })
    : res.status(404).json({ message: "Not found" });
});

module.exports = router;
