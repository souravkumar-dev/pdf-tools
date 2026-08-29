import fs from "fs";
import path from "path";
import { compressPdf } from "../services/compress.service.js";
import { createTempDirectory } from "../utils/tempFile.js";

export async function compressController(req, res) {
  let tempDir;
  let inputPath;
  let outputPath;

  try {
    // Check uploaded file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF file uploaded.",
      });
    }

    const { quality = "balanced" } = req.body;

    console.log("Selected Quality:", quality);

    // Create temporary directory
    tempDir = createTempDirectory();

    console.log("Temp Directory:", tempDir);

    // Copy uploaded file into our temporary directory
    inputPath = path.join(tempDir, req.file.filename);

    fs.copyFileSync(req.file.path, inputPath);

    // Delete Multer's temporary upload
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    // Get original file size BEFORE compression
    const originalSize = fs.statSync(inputPath).size;

    console.log("Original Size:", originalSize);

    // Output filename
    const outputFileName = `compressed-${req.file.filename}`;

    // Output path
    outputPath = path.join(tempDir, outputFileName);

    console.log("Input Path:", inputPath);
    console.log("Output Path:", outputPath);

    // Compress PDF
    await compressPdf(inputPath, outputPath, quality);

    // Get compressed file size
    const compressedSize = fs.statSync(outputPath).size;

    console.log("Compressed Size:", compressedSize);

    const savedBytes = originalSize - compressedSize;

    const savedPercentage =
      originalSize > 0
        ? ((savedBytes / originalSize) * 100).toFixed(2)
        : "0.00";

    console.log("Saved Bytes:", savedBytes);
    console.log("Saved Percentage:", savedPercentage);

    // Send file with size information in headers
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${outputFileName}"`,
      "X-Original-Size": originalSize.toString(),
      "X-Compressed-Size": compressedSize.toString(),
      "X-Saved-Bytes": savedBytes.toString(),
      "X-Saved-Percentage": savedPercentage,
    });

    return res.sendFile(outputPath, (error) => {
      // Cleanup after download
      try {
        if (inputPath && fs.existsSync(inputPath)) {
          fs.unlinkSync(inputPath);
        }

        if (outputPath && fs.existsSync(outputPath)) {
          fs.unlinkSync(outputPath);
        }

        if (tempDir && fs.existsSync(tempDir)) {
          fs.rmdirSync(tempDir);
        }

        console.log("Temporary compression files deleted.");
      } catch (cleanupError) {
        console.error("Cleanup Error:", cleanupError);
      }

      if (error) {
        console.error("Send File Error:", error);
      }
    });
  } catch (error) {
    console.error("Compression Error:", error);

    // Cleanup if an error happens before sendFile()
    try {
      if (inputPath && fs.existsSync(inputPath)) {
        fs.unlinkSync(inputPath);
      }

      if (outputPath && fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }

      if (tempDir && fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    } catch (cleanupError) {
      console.error("Error Cleanup:", cleanupError);
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}