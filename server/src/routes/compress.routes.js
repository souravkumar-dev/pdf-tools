import { Router } from "express";
import upload from "../middlewares/upload.middleware.js";
import { compressController } from "../controllers/compress.controller.js";

const router = Router();

router.post(
  "/compress",
  upload.single("file"),
  compressController
);

export default router;