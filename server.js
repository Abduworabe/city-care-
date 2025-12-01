import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
// ⭐️ IMPORT: Rate Limiter ⭐️
import rateLimiter from "express-rate-limit";

// routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

//public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//middlware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

// --- Cloudinary Configuration ---
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- Security Middleware ---
app.use(helmet());
app.use(mongoSanitize());

// --- General Middleware ---
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Serve static assets from the public folder
app.use(express.static(path.resolve(__dirname, "./client/dist")));

app.use(cookieParser());
app.use(express.json());

// --- Router Middleware ---
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

// --- Static Asset Serving (Catch-all for frontend) ---
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// --- Not Found Middleware (404) ---
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

// --- Error Middleware (Global Error Handler) ---
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {});
} catch (error) {
  console.log(error);
  process.exit(1);
}
