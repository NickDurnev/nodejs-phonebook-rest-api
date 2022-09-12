const express = require("express");
const ctrContacts = require("../../controllers/contacts");
const { validationMiddleware } = require("../../middlewares/validation");
const catchAsyncErrors = require("../../middlewares/errorHandler");
const router = express.Router();

router.get("/", catchAsyncErrors(ctrContacts.get));

router.get("/:contactId", catchAsyncErrors(ctrContacts.getById));

router.post("/", validationMiddleware, ctrContacts.create);

router.delete("/:contactId", ctrContacts.remove);

router.put("/:contactId", validationMiddleware, ctrContacts.update);

router.patch("/:contactId/favorite", ctrContacts.updateStatus);

module.exports = router;
