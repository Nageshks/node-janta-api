const multer = require('multer');
const path = require('path');

// Set the storage engine and file name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// Check file type
function checkFileType(file, cb) {
  // Allowed filetypes
  const filetypes = /jpeg|jpg|png/;

  // Check extension
  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  // Check mimetype
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 3000000 // bytes same as 3MB
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

module.exports = uploadImage;
