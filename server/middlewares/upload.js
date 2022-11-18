const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require("crypto");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
  path: "./config.env",
});
const DB = process.env.DATABASE;

const storage = new GridFsStorage({
  url: DB,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = `GovindBajaj_${buf.toString("hex")}_${
          file.originalname
        }`;
        const fileInfo = {
          filename: filename,
          bucketName: "photos",
        };
        resolve(fileInfo);
      });
    });
  },
});
const store = multer({
  storage,
  limits: { fileSize: 20000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) return cb(null, true);
  cb("filetype");
}
const uploadMiddleware = (req, res, next) => {
  const upload = store.single("image");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send("File too large");
    } else if (err) {
      if (err === "filetype") return res.status(400).send("Image files only");
      return res.sendStatus(500);
    }
    next();
  });
};
module.exports = uploadMiddleware;
