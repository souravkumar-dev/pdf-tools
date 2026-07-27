import { spawn } from "child_process";
import path from "path";

export function compressPdf(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const args = [
      "-sDEVICE=pdfwrite",
      "-dCompatibilityLevel=1.4",
      "-dPDFSETTINGS=/ebook",
      "-dNOPAUSE",
      "-dQUIET",
      "-dBATCH",
      `-sOutputFile=${outputPath}`,
      inputPath,
    ];

    // const gs = spawn("C:\\Program Files\\gs\\gs10.07.1\\bin\\gswin64c.exe", args);
    const gs = spawn(process.env.GHOSTSCRIPT_PATH, args);

    let errorOutput = "";

    gs.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    gs.on("close", (code) => {
      if (code === 0) {
        resolve(outputPath);
      } else {
        reject(new Error(errorOutput || "Ghostscript compression failed."));
      }
    });

    gs.on("error", (err) => {
      reject(err);
    });
  });
}