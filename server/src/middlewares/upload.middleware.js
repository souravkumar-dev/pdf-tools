// import dotenv from "dotenv";
// dotenv.config();

import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "src/uploads");
  },

  filename(req, file, cb) {
    const extension = path.extname(file.originalname);

    cb(null, randomUUID() + extension);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== "application/pdf") {
    return cb(new Error("Only PDF files allowed"));
  }

  cb(null, true);
};

// const upload = multer({
//   storage,

//   fileFilter,

//   limits: {
//     fileSize: Number(process.env.MAX_FILE_SIZE),
//   },
// });

// console.log("MAX_FILE_SIZE =", process.env.MAX_FILE_SIZE);
// console.log("Type =", typeof process.env.MAX_FILE_SIZE);
// console.log("Parsed =", Number(process.env.MAX_FILE_SIZE));

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: Number(process.env.MAX_FILE_SIZE),
  },
});

export default upload;
