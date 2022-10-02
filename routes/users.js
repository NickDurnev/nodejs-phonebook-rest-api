const express = require("express");
const router = express.Router();
const { ctrUsers } = require("../controllers/");
const { userValidation } = require("../middlewares");
const { errorHandler } = require("../middlewares");

const { validationMiddleware } = userValidation;

router.get("/verify/:verificationToken", errorHandler(ctrUsers.verification));

router.post(
  "/verify/",
  validationMiddleware,
  errorHandler(ctrUsers.resendEmail)
);

router.post(
  "/res_password/:resetPasswordToken",
  validationMiddleware,
  errorHandler(ctrUsers.resetPassword)
);

router.post(
  "/res_password/",
  validationMiddleware,
  errorHandler(ctrUsers.updateResetPasswordToken)
);

module.exports = router;
