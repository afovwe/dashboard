import multer from 'multer';

//const storage2 = multer.memoryStorage();

const storage = multer.diskStorage({
  filename: function (req,file,cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({storage: storage});

module.exports = upload;

