import { spawn } from "child_process";

export function compressPdf(inputPath, outputPath, quality = "medium") {

  const qualityMap = {
    best: "/prepress",
    balanced: "/ebook",
    maximum: "/screen",
  };

  const pdfSetting = qualityMap[quality] || qualityMap.medium;

  return new Promise((resolve, reject) => {

    const args = [
      "-sDEVICE=pdfwrite",
      "-dCompatibilityLevel=1.4",
      `-dPDFSETTINGS=${pdfSetting}`,
      "-dNOPAUSE",
      "-dQUIET",
      "-dBATCH",
      `-sOutputFile=${outputPath}`,
      inputPath,
    ];

    console.log("Compression Quality:", quality);
    console.log("Ghostscript Setting:", pdfSetting);

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