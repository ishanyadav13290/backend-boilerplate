import fs from "fs";
import path from "path";
import winston from "winston";

const logsDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logsDir)) {
  try {
    fs.mkdirSync(logsDir, { recursive: true });
  } catch {
    // ignore directory creation errors, fallback to console-only
  }
}

export const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} [${level}]: ${message} - ${stack ?? ""}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    ...(fs.existsSync(logsDir)
      ? [new winston.transports.File({ filename: path.join(logsDir, "error.log") })]
      : []),
  ],
});
