import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import audioRouter from "./router/audio.router";

dotenv.config();

const app = express();

// Correct: server listens on a port
const PORT = process.env.PORT || 4001;

// Correct: allow requests only from your frontend
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_URL,
  })
);

app.use("/audio", audioRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
