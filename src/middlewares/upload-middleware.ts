import multer, { diskStorage } from 'multer';

const storage = diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      cb(null, `${timestamp}-${file.originalname}`);
    },
});

const upload = multer({ storage });

const middleware = upload.single('image');

export { middleware as UploadMiddleware };