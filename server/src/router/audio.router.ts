import express from "express";
import multer from "multer";
import { uploadAudio } from "../controller/audio/upload-audio.controller";

const audioRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

audioRouter.post("/upload-audio", upload.single("audio"), uploadAudio);

export default audioRouter;
