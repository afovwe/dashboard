import multer from 'multer';

//const storage2 = multer.memoryStorage();

const storage2 = multer.diskStorage({
  filename: function (req,file,cb) {
    cb(null, file.originalname)
  }
});

const upload2 = multer({storage: storage2});

module.exports = upload2;