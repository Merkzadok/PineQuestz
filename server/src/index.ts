import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import audioRouter from "./router/audio.router";
import guestRouter from "./router/guest.router";

dotenv.config();

const app = express();
const PORT = 4001;

app.use(express.json());
app.use(cors());

app.use("/audio", audioRouter);
app.use("/guest", guestRouter);

app.listen(PORT, () => {
  console.log(`🚀 server running at http://localhost:${PORT}`);
});
