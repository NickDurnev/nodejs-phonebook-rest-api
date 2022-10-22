const path = require("path");
const { Storage } = require("@google-cloud/storage");
// const { contactService } = require("./service");

const storage = new Storage();
const bucketName = "phonebook-avatars";
const tmpDirPath = path.join(__dirname, ".", "tmp");
const baseURL = "https://storage.googleapis.com";

async function uploadImage(fileName, cloudFileName) {
  console.log(fileName);
  console.log(cloudFileName);
  const filePath = `${tmpDirPath}/${fileName}`;
  const options = {
    destination: cloudFileName,
    metadata: {
      cacheControl: "no-store",
    },
  };

  await storage.bucket(bucketName).upload(filePath, options);
  console.log(`${filePath} uploaded to ${bucketName}`);
}

async function deleteImage(imageURL) {
  if (!imageURL) {
    return;
  }
  const fileName = imageURL.slice(imageURL.length - 21, imageURL.length);
  console.log(`filename:${fileName}`);
  await storage.bucket(bucketName).file(fileName).delete();

  console.log(`gs://${bucketName}/${fileName} deleted`);
}

async function getAvatarUrl(fileName) {
  return `${baseURL}/${bucketName}/${fileName}`;
}

module.exports = { uploadImage, deleteImage, getAvatarUrl };
