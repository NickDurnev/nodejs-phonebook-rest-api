const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
const catchAsyncErrors = require("../middlewares/errorHandler");
const { authMiddleware } = require("../middlewares/tokenValidation");

const contactsRouter = require("../routes/api/contacts");
const authRouter = require("../routes/api/auth");
const usersRouter = require("../routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);
app.use("/users", authMiddleware, usersRouter);

app.use(
  catchAsyncErrors((req, res, next) => {
    next(createError(404));
  })
);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

module.exports = app;
