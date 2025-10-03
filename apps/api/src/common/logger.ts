import { LoggerService } from "@nestjs/common";
import fs from "fs";
import path from "path";

type Level = "info" | "warn" | "error" | "debug" | "verbose";

export class FileLogger implements LoggerService {
  private readonly logDir = path.join(process.cwd(), "logs");

  constructor(private readonly service: string) {}

  log(message: string) {
    this.write("info", message);
  }

  error(message: string, trace?: string) {
    const suffix = trace ? `${message}\n${trace}` : message;
    this.write("error", suffix);
  }

  warn(message: string) {
    this.write("warn", message);
  }

  debug(message: string) {
    this.write("debug", message);
  }

  verbose(message: string) {
    this.write("verbose", message);
  }

  private write(level: Level, message: string) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] [${this.service.toUpperCase()}] [${level.toUpperCase()}] ${message}\n`;
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
    const filePath = path.join(this.logDir, `${timestamp.slice(0, 10)}.log`);
    fs.appendFileSync(filePath, line, { encoding: "utf8" });
  }
}

const instances = new Map<string, FileLogger>();

export function getServiceLogger(service: string) {
  if (!instances.has(service)) {
    instances.set(service, new FileLogger(service));
  }

  return instances.get(service)!;
}
