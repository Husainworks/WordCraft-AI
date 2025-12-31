const path = require("path");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "jpeg"],
    public_id: (req, file) => {
      const name = path.parse(file.originalname).name;
      return `${Date.now()}-${name}`;
    },
  },
});

const upload = multer({ storage });

module.exports = upload;
