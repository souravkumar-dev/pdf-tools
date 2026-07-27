import fs from "fs/promises";
import { PDFDocument } from "pdf-lib";

export async function mergePdfs(inputPaths, outputPath) {
  // Create a new empty PDF
  const mergedPdf = await PDFDocument.create();

  // Loop through all uploaded PDFs
  for (const pdfPath of inputPaths) {
    const pdfBytes = await fs.readFile(pdfPath);

    const pdf = await PDFDocument.load(pdfBytes);

    const copiedPages = await mergedPdf.copyPages(
      pdf,
      pdf.getPageIndices()
    );

    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  // Save merged PDF
  const mergedBytes = await mergedPdf.save();

  await fs.writeFile(outputPath, mergedBytes);

  return outputPath;
}