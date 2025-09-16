import express from "express";
import { textToSpeech } from "../controller/audio/tts.controller";

const audioRouter = express.Router();

audioRouter.post("/upload-audio", textToSpeech);

export default audioRouter;
