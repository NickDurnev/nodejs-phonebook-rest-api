const path = require("path");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage();
const bucketName = "phonebook-avatars";
const tmpDirPath = path.join(__dirname, ".", "tmp");
const baseURL = "https://storage.googleapis.com";
// const generationMatchPrecondition = 0;

// const deleteOptions = {
//   ifGenerationMatch: generationMatchPrecondition,
// };

async function uploadImage(fileName, newFileName) {
  const filePath = `${tmpDirPath}/${fileName}`;
  const options = {
    destination: newFileName,
    metadata: {
      cacheControl: "no-store",
    },
  };

  await storage.bucket(bucketName).upload(filePath, options);
  console.log(`${filePath} uploaded to ${bucketName}`);
}

async function deleteImage(prevURL) {
  if (!prevURL) {
    return;
  }
  const fileName = prevURL.slice(prevURL.length - 27, prevURL.length);
  console.log(fileName);
  await storage.bucket(bucketName).file(fileName).delete();

  console.log(`gs://${bucketName}/${fileName} deleted`);
}

async function getAvatarUrl(fileName) {
  return `${baseURL}/${bucketName}/${fileName}`;
}

module.exports = { uploadImage, deleteImage, getAvatarUrl };
