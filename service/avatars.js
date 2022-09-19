const fs = require("fs");
const jimp = require("jimp");
const db = require("../db/users");

const setUserAvatar = async (email, filename) => {
  const user = email.slice(0, email.indexOf("@"));
  const avatarName = `${user}_avatar.png`;
  jimp
    .read(`./tmp/${filename}`)
    .then((avatar) => {
      return avatar
        .resize(250, 250) // resize
        .write(`./public/avatars/${avatarName}`); // save
    })
    .catch((err) => {
      console.error(err);
    });
  fs.unlink(`./tmp/${filename}`, (err) => {
    if (err) console.log(err);
    else console.log(`${filename} was deleted`);
  });
  return avatarName;
};

const setAvatarURL = async (email, userAvatar) => {
  const avatarURL = `/avatars/${userAvatar}`;
  return await db.updateAvatar(email, avatarURL);
};

module.exports = { setUserAvatar, setAvatarURL };
