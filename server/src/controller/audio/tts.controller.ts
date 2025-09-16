import { Request, Response } from "express";

export const textToSpeech = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    const response = await fetch("https://api.chimege.com/v1.2/synthesize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Token: process.env.CHIMEGE_API_KEY!,
      },
      body: text,
    });

    if (!response.ok) throw new Error(`Chimege API error: ${response.status}`);

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log("");
    // Client-д шууд аудио stream илгээх
    res.setHeader("Content-Type", "audio/wav");
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to synthesize speech" });
  }
};
