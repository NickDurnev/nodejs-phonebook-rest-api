const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const { ctrAvatars } = require("../../controllers");
const ctrUsers = require("../../controllers/users");
const { userValidation } = require("../../middlewares");
const { errorHandler } = require("../../middlewares");

const { validationMiddleware } = userValidation;

const FILE_DIR = path.join(__dirname, "..", "..", "tmp");

console.log(FILE_DIR);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, FILE_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.patch("/avatars", upload.single("avatar"), errorHandler(ctrAvatars));

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
