import fs from "fs";
import path from "path";

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const dir =
  "/home/samarpit/Documents/Projects/2026/samargupta096/report-forge/src";

walkDir(dir, function (filePath) {
  if (filePath.endsWith(".tsx") || filePath.endsWith(".ts")) {
    let content = fs.readFileSync(filePath, "utf-8");
    let newContent = content
      .replace(/bg-white/g, "bg-card")
      .replace(/text-gray-900/g, "text-foreground")
      .replace(/text-gray-800/g, "text-foreground")
      .replace(/text-black/g, "text-foreground")
      .replace(/text-gray-600/g, "text-muted-foreground")
      .replace(/text-gray-500/g, "text-muted-foreground")
      .replace(/bg-gray-50/g, "bg-muted")
      .replace(/bg-gray-100/g, "bg-muted")
      .replace(/border-gray-200/g, "border-border");

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, "utf-8");
      console.log("Updated", filePath);
    }
  }
});
