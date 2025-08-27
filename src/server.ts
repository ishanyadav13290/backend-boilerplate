import app from "./app";
import mongoose from "mongoose";
import { config } from "./config/env";

async function start() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("Connected to MongoDB");

    const server = app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });

    const gracefulShutdown = async (signal: string) => {
      console.log(`Received ${signal}. Closing server...`);
      server.close(async () => {
        await mongoose.connection.close();
        console.log("MongoDB connection closed.");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  } catch (error) {
    console.error("Startup failure:", error);
    process.exit(1);
  }
}

start();
