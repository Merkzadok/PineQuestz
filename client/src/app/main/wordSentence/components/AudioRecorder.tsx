"use client";
import { useState, useRef } from "react";

interface Props {
  correctWord: string;
}

export const AudioRecorder: React.FC<Props> = ({ correctWord }) => {
  const [recording, setRecording] = useState(false);
  const [result, setResult] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Таны браузер микрофон дэмжихгүй байна");
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      await sendToWhisper(audioBlob);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const sendToWhisper = async (audioBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = async () => {
      const base64 = reader.result!.toString().split(",")[1];

      try {
     const res = await fetch("/api/whisper", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ audio: base64 }), // base64 from recorded blob
});


     const data = await res.json();
const spokenText = (data.text || "").trim().toLowerCase();
setResult(spokenText);
setIsCorrect(spokenText === correctWord.toLowerCase());
      } catch (err) {
        console.error(err);
        alert("Whisper API руу дамжуулахад алдаа гарлаа");
      }
    };
  };

  return (
    <div className="mt-4">
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`p-2 rounded ${recording ? "bg-red-500" : "bg-blue-500"} text-white`}
      >
        {recording ? "Бичиж байна..." : "Микрофоноор унших"}
      </button>

      {result && (
        <p className="mt-2">
          Танилцуулсан үг: <strong>{result}</strong>
          {isCorrect !== null && (
            <span className={isCorrect ? "text-green-600" : "text-red-600"}>
              {isCorrect ? " (Зөв!)" : " (Буруу!)"}
            </span>
          )}
        </p>
      )}
    </div>
  );
}
