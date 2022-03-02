const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const storage = new GridFsStorage({
  url: process.env.DB,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jepg"];
    if (match.indexOf(file.mimetype === -1)) {
      const fileName = `${Date.now()}-any-name-${file.originalname}`;
      return fileName
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-any-name-${file.originalname}`,
    };
  },
});

module.exports = multer({ storage });