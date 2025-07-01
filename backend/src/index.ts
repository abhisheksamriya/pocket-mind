import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth";
import contentRoutes from "./routes/content";
import shareRoutes from "./routes/share";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL || "";

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/content", contentRoutes);
app.use("/api/v1/brain", shareRoutes);

mongoose.connect(databaseUrl).then(() => {
  app.listen(port, "0.0.0.0", () =>
    console.log(`Server running on port ${port}`)
  );
});
