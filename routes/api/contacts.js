const express = require("express");
const ctrContacts = require("../../controllers/contacts");
const { validationMiddleware } = require("../../middlewares/contactValidation");
const catchAsyncErrors = require("../../middlewares/errorHandler");
const router = express.Router();

router.get("/", catchAsyncErrors(ctrContacts.get));

router.get("/:contactId", catchAsyncErrors(ctrContacts.getById));

router.post("/", validationMiddleware, catchAsyncErrors(ctrContacts.create));

router.delete("/:contactId", catchAsyncErrors(ctrContacts.remove));

router.put(
  "/:contactId",
  validationMiddleware,
  catchAsyncErrors(ctrContacts.update)
);

router.patch(
  "/:contactId/favorite",
  catchAsyncErrors(ctrContacts.updateStatus)
);

module.exports = router;
