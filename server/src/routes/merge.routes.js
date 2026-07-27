import { Router } from "express";
import upload from "../middlewares/upload.middleware.js";
import { mergeController } from "../controllers/merge.controller.js";

const router = Router();

router.post(
  "/merge",
  upload.array("files", 20),
  mergeController
);

export default router;