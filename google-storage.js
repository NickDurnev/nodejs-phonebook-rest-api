const path = require("path");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage();
const bucketName = "phonebook-avatars";
const tmpDirPath = path.join(__dirname, ".", "tmp");

async function launchStore(fileName) {
  const filePath = `${tmpDirPath}/${fileName}`;
  console.log(fileName);
  console.log(filePath);
  const options = {
    destination: fileName,
  };

  await storage.bucket(bucketName).upload(filePath, options);
  console.log(`${filePath} uploaded to ${bucketName}`);
}

module.exports = launchStore;
