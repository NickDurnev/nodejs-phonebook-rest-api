const createError = require("http-errors");

const unauthorizedError = new createError.Unauthorized("Not authorized");

module.exports = {
  unauthorizedError,
};
