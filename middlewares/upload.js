const util = require("util");
const multer = require("multer");
const maxSize = 2 * 3024 * 3024;

let storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let storageDonation = multer.diskStorage({
    destination: "uploads/donations",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileDonation = multer({
    storage: storageDonation,
    limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = {uploadFileMiddleware, uploadFileDonation};
