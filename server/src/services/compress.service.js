import { spawn } from "child_process";

export function compressPdf(inputPath, outputPath, quality = "balanced") {
  const qualityMap = {
    best: "/prepress",
    balanced: "/ebook",
    maximum: "/screen",
  };

  const pdfSetting = qualityMap[quality] || qualityMap.balanced;

  // Use the configured path when provided.
  // Otherwise use the default Ghostscript command.
  const ghostscriptPath =
    process.env.GHOSTSCRIPT_PATH ||
    (process.platform === "win32" ? "gswin64c" : "gs");

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
    console.log("Ghostscript Path:", ghostscriptPath);

    const gs = spawn(ghostscriptPath, args);

    let errorOutput = "";

    gs.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    gs.on("close", (code) => {
      if (code === 0) {
        resolve(outputPath);
      } else {
        reject(
          new Error(
            errorOutput || `Ghostscript compression failed with code ${code}.`
          )
        );
      }
    });

    gs.on("error", (err) => {
      reject(err);
    });
  });
}