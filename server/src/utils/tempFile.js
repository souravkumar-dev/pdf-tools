import fs from "fs";
import os from "os";
import path from "path";

export function createTempDirectory() {
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "pdf-tools-")
  );

  return tempDir;
}