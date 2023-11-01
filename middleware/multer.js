const multer = require('multer');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/photos');  
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;