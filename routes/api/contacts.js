const express = require("express");
const { ctrContacts } = require("../../controllers");
const {
  contactValidation,
  errorHandler,
  tokenVerification,
} = require("../../middlewares");
const router = express.Router();

router.get("/:userID/:contactId", errorHandler(ctrContacts.getById));

router.get("/:userID/search/:contactName", errorHandler(ctrContacts.getByName));

router.get("/:userID", tokenVerification, errorHandler(ctrContacts.get));

router.post("/", contactValidation, errorHandler(ctrContacts.create));

router.delete("/:contactId", errorHandler(ctrContacts.remove));

router.patch(
  "/:contactId",
  contactValidation,
  errorHandler(ctrContacts.update)
);

router.patch("/:contactId/favorite", errorHandler(ctrContacts.updateStatus));

module.exports = router;
