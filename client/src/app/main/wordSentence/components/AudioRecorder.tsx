"use client";

import { useState, useRef } from "react";

export default function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorderRef.current = mediaRecorder;
    audioChunks.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.current.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
      const formData = new FormData();
      formData.append("file", audioBlob, "recording.webm");

      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.text) {
        setTranscript(data.text);
      } else {
        setTranscript("⚠️ Алдаа гарлаа");
      }
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  };

  return (
    <div className="p-6 flex flex-col gap-4 items-center">
      <h2 className="text-xl font-bold">🎤 Дуу бичлэг → Whisper API</h2>

      <button
        onClick={recording ? stopRecording : startRecording}
        className={`px-6 py-3 rounded-full text-white font-bold ${
          recording ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {recording ? "⏹ Бичлэг зогсоох" : "🎙 Бичлэг эхлүүлэх"}
      </button>

      {transcript && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg w-full max-w-md text-center">
          <p className="text-lg font-medium">📝 Танил текст:</p>
          <p className="text-xl font-bold text-green-700">{transcript}</p>
        </div>
      )}
    </div>
  );
}
