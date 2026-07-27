import { Router } from "express";

import upload from "../middlewares/upload.middleware.js";

import uploadController from "../controllers/upload.controller.js";

const router = Router();

router.post(

    "/upload",

    upload.single("file"),

    uploadController

);

export default router;