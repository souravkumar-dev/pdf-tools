import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { mergePdfs } from "../services/merge.service.js";
import { createTempDirectory } from "../utils/tempFile.js";

export async function mergeController(req, res) {
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least 2 PDF files.",
      });
    }

    const tempDir = createTempDirectory();

    console.log("Temp Directory:", tempDir);

    // Uploaded PDF paths
    const inputPaths = req.files.map((file) => {
      const tempInputPath = path.join(tempDir, file.filename);

      fs.copyFileSync(file.path, tempInputPath);
      fs.unlinkSync(file.path);

      return tempInputPath;
    });

    // Output filename
    const outputFileName = `merged-${randomUUID()}.pdf`;

    // Output path
    const outputPath = path.join(tempDir, outputFileName);

    console.log("Input Files:");
    inputPaths.forEach((file, index) => {
      console.log(`${index + 1}. ${file}`);
    });

    console.log("Output:", outputPath);
    // Merge PDFs
    await mergePdfs(inputPaths, outputPath);

    // File statistics
    const mergedSize = fs.statSync(outputPath).size;

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${outputFileName}"`,
      "X-Total-Files": req.files.length.toString(),
      "X-Merged-Size": mergedSize.toString(),
    });

    return res.sendFile(outputPath, (error) => {
      try {
        inputPaths.forEach((inputPath) => {
          if (fs.existsSync(inputPath)) {
            fs.unlinkSync(inputPath);
          }
        });

        if (fs.existsSync(outputPath)) {
          fs.unlinkSync(outputPath);
        }

        if (fs.existsSync(tempDir)) {
          fs.rmdirSync(tempDir);
        }
      } catch (cleanupError) {
        console.error("Cleanup Error:", cleanupError);
      }

      if (error) {
        console.error("Send File Error:", error);
      }
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
