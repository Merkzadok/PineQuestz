import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // form-data ашиглана
  },
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Зөвхөн POST хүсэлт дэмжигдэнэ" });
  }

  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Файл дамжуулахад алдаа гарлаа" });

    try {
      const audioFile = Array.isArray(files.file) ? files.file[0] : files.file;

      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(audioFile.filepath),
        model: "whisper-1",
        language: "mn", // Монгол хэл
      });

      res.status(200).json({ text: transcription.text });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "OpenAI руу илгээхэд алдаа гарлаа" });
    }
  });
}
