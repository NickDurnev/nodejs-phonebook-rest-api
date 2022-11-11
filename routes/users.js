const express = require("express");
const router = express.Router();
const { ctrUsers } = require("../controllers/");
const { userValidation, errorHandler } = require("../middlewares");

router.get("/verify/:verificationToken", errorHandler(ctrUsers.verification));

router.post("/verify/", userValidation, errorHandler(ctrUsers.resendEmail));

router.post(
  "/res_password/:resetPasswordToken",
  userValidation,
  errorHandler(ctrUsers.resetPassword)
);

router.post(
  "/res_password/",
  userValidation,
  errorHandler(ctrUsers.updateResetPasswordToken)
);

router.patch("/:userId", errorHandler(ctrUsers.updateSub));

module.exports = router;
