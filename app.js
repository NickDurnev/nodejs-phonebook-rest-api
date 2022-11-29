const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
const { errorHandler, tokenValidation } = require("./middlewares");

const { contactsApiRouter } = require("./routes/api");
const { authApiRouter } = require("./routes/api");
const { usersRouter } = require("./routes");
const { contactsRouter } = require("./routes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", tokenValidation, contactsApiRouter);
app.use("/api/users", authApiRouter);
app.use("/users", tokenValidation, usersRouter);
app.use("/contacts", tokenValidation, contactsRouter);

app.use(
  errorHandler((req, res, next) => {
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
