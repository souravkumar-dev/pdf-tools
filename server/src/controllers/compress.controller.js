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

    // Uploaded PDF path
    const inputPath = path.resolve(req.file.path);

    // Output filename
    const outputFileName = `compressed-${req.file.filename}`;

    // Output path
    const outputPath = path.resolve("src", "output", outputFileName);

    console.log("Input Path:", inputPath);
    console.log("Output Path:", outputPath);

    // Compress PDF
    await compressPdf(inputPath, outputPath);

    console.log("Input Size :", fs.statSync(inputPath).size);
    console.log("Output Size :", fs.statSync(outputPath).size);

    // return res.status(200).json({
    //     success: true,
    //     message: "PDF compressed successfully.",
    //     fileName: outputFileName,
    // });

    const originalSize = fs.statSync(inputPath).size;
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

// import fs from "fs";
// import path from "path";
// import { compressPdf } from "../services/compress.service.js";

// export async function compressController(req, res) {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "No PDF uploaded",
//       });
//     }
//     console.log(req.file);

//     const inputPath = path.resolve(req.file.path);

//     const outputFileName = `compressed-${req.file.filename}`;

//     const outputPath = path.resolve("src", "output", outputFileName);

//     console.log("Input Path :", inputPath);
//     console.log("Output Path:", outputPath);

//     console.log("Input Exists :", fs.existsSync(inputPath));
//     console.log("Input Size :", fs.statSync(inputPath).size);

//     await compressPdf(inputPath, outputPath);

//     console.log("Output Exists :", fs.existsSync(outputPath));

//     if (fs.existsSync(outputPath)) {
//       console.log("Output Size :", fs.statSync(outputPath).size);
//     }

//     res.json({
//       success: true,
//       fileName: outputFileName,
//     });
//   } catch (err) {
//     console.log(err);

//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// }
