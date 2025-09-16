import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { Readable } from "stream";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type Data = { text?: string; error?: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Метод ${req.method} дэмжигддэггүй` });
  }

  try {
    const { audio } = req.body;
    if (!audio) return res.status(400).json({ error: "Audio өгөгдөл олдсонгүй" });

    const buffer = Buffer.from(audio, "base64");

    // Buffer → Readable Stream
    const stream = Readable.from(buffer);

    const transcription = await openai.audio.transcriptions.create({
      file: stream as any,  
      model: "whisper-1",
      // file: new Blob([buffer]), 
    });

    res.status(200).json({ text: transcription.text });
  } catch (err: unknown) {
    console.error(err);
    let message = "Алдаа гарлаа";
    if (err instanceof Error) message = err.message;
    res.status(500).json({ error: message });
  }
}
