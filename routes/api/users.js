const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const { setAvatar } = require("../../controllers/avatars");
const ctrUsers = require("../../controllers/users");
const { validationMiddleware } = require("../../middlewares/userValidation");
const catchAsyncErrors = require("../../middlewares/errorHandler");

const FILE_DIR = path.join("./tmp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, FILE_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.patch("/avatars", upload.single("avatar"), catchAsyncErrors(setAvatar));

router.get(
  "/verify/:verificationToken",
  catchAsyncErrors(ctrUsers.verification)
);

router.post(
  "/verify/",
  validationMiddleware,
  catchAsyncErrors(ctrUsers.resendEmail)
);

router.post(
  "/res_password/:resetPasswordToken",
  validationMiddleware,
  catchAsyncErrors(ctrUsers.resetPassword)
);

router.post(
  "/res_password/",
  validationMiddleware,
  catchAsyncErrors(ctrUsers.updateResetPasswordToken)
);

module.exports = router;
