import fs from "fs";
import path from "path";

export function downloadController(req, res) {
  try {
    const { filename } = req.params;

    const filePath = path.resolve("src", "output", filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "File not found.",
      });
    }

    res.download(filePath);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}