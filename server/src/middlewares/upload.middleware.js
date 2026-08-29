import multer from "multer";
import path from "path";
import os from "os";
import fs from "fs";
import { randomUUID } from "crypto";

const uploadDir = path.join(os.tmpdir(), "pdf-tools-uploads");

// Create upload directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
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

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: Number(process.env.MAX_FILE_SIZE),
  },
});

export default upload;