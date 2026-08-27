import fs from "fs";
import path from "path";
import os from "os";

export function downloadController(req, res) {
  try {
    const { tempDir, filename } = req.params;

    // Prevent path traversal
    const safeTempDir = path.basename(tempDir);
    const safeFilename = path.basename(filename);

    // Temporary directory path
    const tempDirectory = path.join(os.tmpdir(), safeTempDir);

    // File path
    const filePath = path.join(tempDirectory, safeFilename);

    console.log("Download Temp Directory:", tempDirectory);
    console.log("Download File:", filePath);

    // Check file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "File not found.",
      });
    }

    // Download file
    res.download(filePath, safeFilename, (error) => {
      if (error) {
        console.error("Download Error:", error);

        // If headers have not been sent, return an error
        if (!res.headersSent) {
          return res.status(500).json({
            success: false,
            message: "Failed to download file.",
          });
        }

        return;
      }

      // Delete temporary directory after successful download
      fs.rm(tempDirectory, { recursive: true, force: true }, (cleanupError) => {
        if (cleanupError) {
          console.error("Temporary Directory Cleanup Error:", cleanupError);
        } else {
          console.log("Temporary Directory Deleted:", tempDirectory);
        }
      });
    });
  } catch (error) {
    console.error("Download Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}