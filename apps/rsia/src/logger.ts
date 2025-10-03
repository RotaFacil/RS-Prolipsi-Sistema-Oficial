import fs from "fs";
import path from "path";

type Level = "info" | "warn" | "error" | "debug";

const logDir = path.join(process.cwd(), "logs");

function ensure() {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
}

export function log(message: string, level: Level = "info") {
  ensure();
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
  const filePath = path.join(logDir, `${timestamp.slice(0, 10)}.log`);
  fs.appendFileSync(filePath, line, { encoding: "utf8" });
}
