const express = require("express");
const { ctrUsers } = require("../../controllers");
const {
  userValidation,
  tokenValidation,
  errorHandler,
} = require("../../middlewares");
const router = express.Router();

router.post("/signup", userValidation, errorHandler(ctrUsers.registration));

router.post("/login", userValidation, errorHandler(ctrUsers.login));

router.get("/logout", tokenValidation, errorHandler(ctrUsers.logout));

router.get("/current", tokenValidation, errorHandler(ctrUsers.currentUser));

module.exports = router;
