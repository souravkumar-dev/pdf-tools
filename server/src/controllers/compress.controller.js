import fs from "fs";
import path from "path";
import { compressPdf } from "../services/compress.service.js";

export async function compressController(req, res) {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF file uploaded.",
      });
    }
    const { quality = "balanced" } = req.body;

    console.log("Selected Quality:", quality);

    // Uploaded PDF path
    const inputPath = path.resolve(req.file.path);

    // Output filename
    const outputFileName = `compressed-${req.file.filename}`;

    // Output path
    const outputPath = path.resolve("src", "output", outputFileName);

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

    return res.status(200).json({
      success: true,
      message: "PDF compressed successfully.",
      downloadUrl: `/api/pdf/download/${outputFileName}`,
      originalSize,
      compressedSize,
      savedBytes,
      savedPercentage,
    });
  } catch (error) {
    console.error("Compression Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
