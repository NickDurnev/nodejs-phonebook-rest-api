const { Schema, model } = require("mongoose");

const contacts = new Schema({
  userID: String,
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  surname: String,
  email: String,
  phone: String,
  avatarURL: String,
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model("Contacts", contacts);

module.exports = Contact;
