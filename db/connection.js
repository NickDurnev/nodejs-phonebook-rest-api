const mongoose = require("mongoose");
require("dotenv").config();

const contactsDB = process.env.DB_HOST;

const connection = async () => {
  return mongoose.connect(contactsDB, {
    promiseLibrary: global.Promise,
    useUnifiedTopology: true,
  });
};

module.exports = connection;
