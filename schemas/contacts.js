const { Schema, model } = require("mongoose");

const contacts = new Schema({
  userID: { type: String },
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  surname: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  avatarURL: String,
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model("Contacts", contacts);

module.exports = Contact;
