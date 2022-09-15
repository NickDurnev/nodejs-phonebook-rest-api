const express = require("express");
const ctrUsers = require("../../controllers/users");
const { validationMiddleware } = require("../../middlewares/userValidation");
const { authMiddleware } = require("../../middlewares/tokenValidation");
const catchAsyncErrors = require("../../middlewares/errorHandler");
const router = express.Router();

router.post(
  "/signup",
  validationMiddleware,
  catchAsyncErrors(ctrUsers.registration)
);

router.post("/login", validationMiddleware, catchAsyncErrors(ctrUsers.login));

router.get("/logout", authMiddleware, catchAsyncErrors(ctrUsers.logout));

router.get("/current", authMiddleware, catchAsyncErrors(ctrUsers.currentUser));

router.patch("/:userId", catchAsyncErrors(ctrUsers.updateSub));

module.exports = router;
