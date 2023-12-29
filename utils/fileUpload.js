const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;
const fs = require("fs");
const util = require("util");

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const uploadAsync = util.promisify(cloudinary.uploader.upload);

async function Upload(file, resourceType, prefix = "authSong") {
  try {
    const result = await uploadAsync(file, {
      resource_type: resourceType,
      public_id_prefix: prefix,
    });
    return { result, error: null };
  } catch (error) {
    return { result: null, error };
  }
}

function searchFile(directoryPath, fileNameToFind) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error("Error occurred while checking file:", err);
          return;
        }

        if (stats.isFile() && file === fileNameToFind) {
          console.log("File found at:", filePath);
          // Do something with the file here
        } else if (stats.isDirectory()) {
          // If it's a directory, recursively search within it
          searchFile(filePath, fileNameToFind);
        }
      });
    });
  });
}
module.exports = { Upload, searchFile };
