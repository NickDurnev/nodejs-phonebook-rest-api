const express = require("express");
const { ctrContacts } = require("../../controllers");
const { contactValidation } = require("../../middlewares");
const { errorHandler } = require("../../middlewares");
const { tokenVerification } = require("../../middlewares/tokenVerification");
const router = express.Router();

const { validationMiddleware } = contactValidation;

router.get("/:userID", tokenVerification, errorHandler(ctrContacts.get));

router.get("/:contactId", errorHandler(ctrContacts.getById));

router.post("/", validationMiddleware, errorHandler(ctrContacts.create));

router.delete("/:contactId", errorHandler(ctrContacts.remove));

router.put(
  "/:contactId",
  validationMiddleware,
  errorHandler(ctrContacts.update)
);

router.patch("/:contactId/favorite", errorHandler(ctrContacts.updateStatus));

module.exports = router;
