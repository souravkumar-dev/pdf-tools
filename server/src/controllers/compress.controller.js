import fs from "fs";
import path from "path";
import { compressPdf } from "../services/compress.service.js";
import { createTempDirectory } from "../utils/tempFile.js";

export async function compressController(req, res) {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF file uploaded.",
      });
    }
    const tempDir = createTempDirectory();

    console.log("Temp Directory:", tempDir);

    const { quality = "balanced" } = req.body;

    console.log("Selected Quality:", quality);

    // Uploaded PDF path
    const inputPath = path.join(tempDir, req.file.filename);
    fs.copyFileSync(req.file.path, inputPath);
    fs.unlinkSync(req.file.path);

    // Output filename
    const outputFileName = `compressed-${req.file.filename}`;

    // Output path
    const outputPath = path.join(tempDir, outputFileName);

    console.log("Input Path:", inputPath);
    console.log("Output Path:", outputPath);

    const originalSize = fs.statSync(inputPath).size;

    // Compress PDF
    await compressPdf(inputPath, outputPath, quality);
    // fs.unlinkSync(inputPath);

    console.log("Original Size :", originalSize);
    console.log("Output Size :", fs.statSync(outputPath).size);
    // return res.status(200).json({
    //     success: true,
    //     message: "PDF compressed successfully.",
    //     fileName: outputFileName,
    // });

    const compressedSize = fs.statSync(outputPath).size;

    const savedBytes = originalSize - compressedSize;

    const savedPercentage = ((savedBytes / originalSize) * 100).toFixed(2);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${outputFileName}"`,
      "X-Original-Size": originalSize.toString(),
      "X-Compressed-Size": compressedSize.toString(),
      "X-Saved-Bytes": savedBytes.toString(),
      "X-Saved-Percentage": savedPercentage.toString(),
    });

    return res.sendFile(outputPath, (error) => {
      // Clean up temporary files after the response finishes
      try {
        if (fs.existsSync(inputPath)) {
          fs.unlinkSync(inputPath);
        }

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
    console.error("Compression Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
