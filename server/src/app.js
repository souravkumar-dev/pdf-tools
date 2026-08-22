

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import uploadRoutes from "./routes/upload.routes.js";
import compressRoutes from "./routes/compress.routes.js";
import downloadRoutes from "./routes/download.routes.js";
import mergeRoutes from "./routes/merge.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
     exposedHeaders: [
      "X-Original-Size",
      "X-Compressed-Size",
      "X-Saved-Bytes",
      "X-Saved-Percentage",
    ],
  })
);


app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/pdf", uploadRoutes);
app.use("/api/pdf", compressRoutes);
app.use("/api/pdf", mergeRoutes);
app.use("/api/pdf", downloadRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "PDF Tools API Running",
  });
});

export default app;