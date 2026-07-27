import { Router } from "express";
import { downloadController } from "../controllers/download.controller.js";

const router = Router();

router.get("/download/:filename", downloadController);

export default router;