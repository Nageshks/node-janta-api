const fs = require('fs');
const { flip } = require('lodash');
const path = require('path');

const createDirectories = () => {
  const uploadDir = path.join(__dirname, '../../uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
};

const removeFile = (filePath) => {
  if(filePath == null || filePath == undefined) return; 
  if (!fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(`Error deleting file: ${filePath}`);
        console.log(err);
      } else {
        console.log(`File deleted: ${filePath}`);
      }
    });
  }
};

module.exports = {
  createDirectories,
  removeFile,
};
