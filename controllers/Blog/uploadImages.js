//controllers/Blog/uploadImages.js

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const bannerImageDir = "./bannerImage/images";
const contentImageDir = "./contentImage/images";

if (!fs.existsSync(bannerImageDir)) {
  fs.mkdirSync(bannerImageDir, { recursive: true });
}

if (!fs.existsSync(contentImageDir)) {
  fs.mkdirSync(contentImageDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "bannerImageUrl") {
      cb(null, bannerImageDir);
    } else if (file.fieldname === "contentImageUrl") {
      cb(null, contentImageDir);
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const mimeType = allowedFileTypes.test(file.mimetype);
  const extName = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (mimeType && extName) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, JPG, or PNG files are allowed"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter,
});

module.exports = upload;
