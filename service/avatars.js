const fs = require("fs");
const { customAlphabet } = require("nanoid");
const path = require("path");
const jimp = require("jimp");
const { uploadImage, deleteImage, getAvatarUrl } = require("../google-storage");
const { dbContacts } = require("../db");

const nanoid = customAlphabet("1234567890abcdef", 16);
const tmpDirPath = path.join(__dirname, "..", "tmp");

const setContactAvatar = async (contactID, filename, prevURL) => {
  const newFileName = `${nanoid()}_avatar.png`;
  jimp
    .read(`${tmpDirPath}/${filename}`)
    .then((avatar) => {
      return avatar.resize(250, 250); // resize
    })
    .then((avatar) => uploadImage(filename, newFileName))
    .then(() =>
      fs.unlink(`${tmpDirPath}/${filename}`, (err) => {
        if (err) console.log(err);
        else console.log(`${filename} was deleted`);
      })
    )
    .then(() => deleteImage(prevURL))
    .catch((err) => {
      console.error(err);
    });
  return newFileName;
};

const setAvatarURL = async (contactID, filename) => {
  const url = await getAvatarUrl(filename);
  console.log(url);
  return await dbContacts.updateAvatar(contactID, url);
};

module.exports = { setContactAvatar, setAvatarURL };
