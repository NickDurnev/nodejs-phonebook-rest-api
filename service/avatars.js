const fs = require("fs");
const path = require("path");
const jimp = require("jimp");
const { customAlphabet } = require("nanoid");
const { uploadImage, deleteImage, getAvatarUrl } = require("../google-storage");
const { dbContacts } = require("../db");

const tmpDirPath = path.join(__dirname, "..", "tmp");

const setContactAvatar = async (filename, imageURL) => {
  const nanoid = customAlphabet("1234567890abcdef", 10);
  const cloudFileName = `${nanoid()}_avatar.png`;
  const tmpFilePath = `${tmpDirPath}/${filename}`;
  try {
    await jimp
      .read(tmpFilePath)
      .then((avatar) => {
        return avatar.resize(250, 250).writeAsync(tmpFilePath); // resize
      })
      .catch((err) => {
        console.error(err);
      });
    await uploadImage(filename, cloudFileName);
    await fs.unlink(tmpFilePath, (err) => {
      if (err) console.log(err);
      else console.log(`${filename} was deleted`);
    });
    await deleteImage(imageURL);
    return cloudFileName;
  } catch (error) {
    console.log(error);
  }
};

const setAvatarURL = async (contactID, filename) => {
  const url = await getAvatarUrl(filename);
  return await dbContacts.updateAvatar(contactID, url);
};

module.exports = { setContactAvatar, setAvatarURL };
