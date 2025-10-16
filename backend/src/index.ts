import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import contentRoutes from "./routes/content.js";
import shareRoutes from "./routes/share.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is not defined in .env file");
  process.exit(1);
}

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/content", contentRoutes);
app.use("/api/v1/brain", shareRoutes);

mongoose
  .connect(databaseUrl, {
    ssl: true,
    tlsAllowInvalidCertificates: true,
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log(" MongoDB connected successfully");
    app.listen(port, "0.0.0.0", () =>
      console.log(`Server running on port ${port}`)
    );
  })
  .catch((err) => {
    console.error("mongoDB connection error:", err.message);
    process.exit(1);
  });
