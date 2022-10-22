const express = require("express");
const multer = require("multer");
const path = require("path");
const { ctrAvatars } = require("../controllers");
const { errorHandler } = require("../middlewares");

const router = express.Router();

const FILE_DIR = path.join(__dirname, "..", "tmp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, FILE_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage, limits: { fileSize: 1 * 1000 * 1000 } });

router.patch(
  "/avatars/:contactID",
  upload.single("avatar"),
  errorHandler(ctrAvatars.setAvatar)
);

module.exports = router;
