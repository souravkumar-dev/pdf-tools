import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { mergePdfs } from "../services/merge.service.js";

export async function mergeController(req, res) {
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least 2 PDF files.",
      });
    }

    // Uploaded PDF paths
    const inputPaths = req.files.map((file) => path.resolve(file.path));

    // Output filename
    const outputFileName = `merged-${randomUUID()}.pdf`;

    // Output path
    const outputPath = path.resolve("src", "output", outputFileName);

    console.log("Input Files:");
    inputPaths.forEach((file, index) => {
      console.log(`${index + 1}. ${file}`);
    });

    console.log("Output:", outputPath);
    // Merge PDFs
    await mergePdfs(inputPaths, outputPath);

    // File statistics
    const mergedSize = fs.statSync(outputPath).size;

    return res.status(200).json({
      success: true,
      message: "PDFs merged successfully.",
      totalFiles: req.files.length,
      mergedSize,
      downloadUrl: `/api/pdf/download/${outputFileName}`,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
