import { NextRequest, NextResponse } from "next/server";

// Optional: uncomment if you have OpenAI API
// import OpenAI from "openai";
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { audio } = await req.json(); // base64 string

    if (!audio) {
      return NextResponse.json({ error: "No audio provided" }, { status: 400 });
    }

    // -------------------------------
    // MOCK: Return a fake word for testing
    const mockedText = "mockedword";

    // -------------------------------
    // REAL: Use OpenAI Whisper API
    // const buffer = Buffer.from(audio, "base64");
    // const response = await openai.audio.transcriptions.create({
    //   file: buffer,
    //   model: "whisper-1"
    // });
    // const text = response.text.trim();

    return NextResponse.json({ text: mockedText });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
