const express = require("express");
const { ctrUsers } = require("../../controllers");
const { userValidation } = require("../../middlewares");
const { tokenValidation } = require("../../middlewares");
const { errorHandler } = require("../../middlewares");
const router = express.Router();

const { authMiddleware } = tokenValidation;
const { validationMiddleware } = userValidation;

router.post(
  "/signup",
  validationMiddleware,
  errorHandler(ctrUsers.registration)
);

router.post("/login", validationMiddleware, errorHandler(ctrUsers.login));

router.get("/logout", authMiddleware, errorHandler(ctrUsers.logout));

router.get("/current", authMiddleware, errorHandler(ctrUsers.currentUser));

router.patch("/:userId", errorHandler(ctrUsers.updateSub));

module.exports = router;
