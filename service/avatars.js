const fs = require("fs");
const path = require("path");
const jimp = require("jimp");
const { dbUsers } = require("../db");

const tmpDirPath = path.join(__dirname, "..", "tmp");
const avatarDirPath = path.join(__dirname, "..", "public", "avatars");

const setUserAvatar = async (email, filename) => {
  const user = email.slice(0, email.indexOf("@"));
  const avatarName = `${user}_avatar.png`;
  jimp
    .read(`${tmpDirPath}/${filename}`)
    .then((avatar) => {
      return avatar
        .resize(250, 250) // resize
        .write(`${avatarDirPath}/${avatarName}`); // save
    })
    .catch((err) => {
      console.error(err);
    });
  fs.unlink(`${tmpDirPath}/${filename}`, (err) => {
    if (err) console.log(err);
    else console.log(`${filename} was deleted`);
  });
  return avatarName;
};

const setAvatarURL = async (email, userAvatar) => {
  const avatarURL = `/avatars/${userAvatar}`;
  return await dbUsers.updateAvatar(email, avatarURL);
};

module.exports = { setUserAvatar, setAvatarURL };
