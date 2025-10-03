'use server';

import fs from "fs";
import path from "path";

interface Payload {
  status: "ok";
  service: string;
  timestamp: string;
}

type LogLevel = "info" | "warn" | "error";

const logDir = path.join(process.cwd(), "logs");

function ensureLogDir() {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
}

export function writeLog(message: string, level: LogLevel = "info") {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
  ensureLogDir();
  const filePath = path.join(logDir, `${timestamp.slice(0, 10)}.log`);
  fs.appendFileSync(filePath, line, { encoding: "utf8" });
}

export function healthResponse(service: string): Payload {
  const payload: Payload = {
    status: "ok",
    service,
    timestamp: new Date().toISOString()
  };
  writeLog(`${service} health check`, "info");
  return payload;
}
