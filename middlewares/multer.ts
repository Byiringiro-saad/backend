import multer from "multer";

const multerStorage = multer.diskStorage({
  destination: (request: any, file: any, callback: any) => {
    callback(null, __dirname);
  },

  filename: (request: any, file: any, callback: any) => {
    callback(null, file.originalname);
  },
});

export const multerUpload = multer({ storage: multerStorage });
