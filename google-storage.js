const path = require("path");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage();
const bucketName = "phonebook-avatars";
const tmpDirPath = path.join(__dirname, ".", "tmp");
const baseURL = "https://storage.googleapis.com";

async function uploadImage(fileName, newFileName) {
  const filePath = `${tmpDirPath}/${fileName}`;
  const options = {
    destination: newFileName,
  };

  await storage.bucket(bucketName).upload(filePath, options);
  console.log(`${filePath} uploaded to ${bucketName}`);
}

async function getAvatarUrl(fileName) {
  return `${baseURL}/${bucketName}/${fileName}`;
}

module.exports = { uploadImage, getAvatarUrl };
