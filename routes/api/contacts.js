const express = require("express");
const { ctrContacts } = require("../../controllers");
const { contactValidation, errorHandler } = require("../../middlewares");
const router = express.Router();

router.get("/", errorHandler(ctrContacts.get));

router.post("/", contactValidation, errorHandler(ctrContacts.create));

router.get("/:contactId", errorHandler(ctrContacts.getById));

router.patch(
  "/:contactId",
  contactValidation,
  errorHandler(ctrContacts.update)
);

router.delete("/:contactId", errorHandler(ctrContacts.remove));

router.get("/search/:contactName", errorHandler(ctrContacts.getByName));

router.patch("/:contactId/favorite", errorHandler(ctrContacts.updateStatus));

module.exports = router;
