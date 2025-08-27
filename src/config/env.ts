import dotenv from "dotenv";

dotenv.config();

const isTest = process.env.NODE_ENV === "test";

const required = (value: string | undefined, name: string): string => {
  if (!value && !isTest) {
    throw new Error(`${name} is not set in environment variables`);
  }
  return value ?? "";
};

export const config = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT) || 8080,
  mongoUri: isTest ? (process.env.MONGO_URI ?? "mongodb://localhost:27017/test") : required(process.env.MONGO_URI, "MONGO_URI"),
  jwtSecret: isTest ? (process.env.JWT_SECRET ?? "test-secret") : required(process.env.JWT_SECRET, "JWT_SECRET"),
};


