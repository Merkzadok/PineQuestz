"use client";
import { useState, useRef } from "react";

interface Props {
  correctWord: string;
}

export const AudioRecorder: React.FC<Props> = ({ correctWord }) => {
  const [recording, setRecording] = useState(false);
  const [result, setResult] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      await sendToWhisper(blob);
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
        const res = await fetch("http://localhost:4001/api/whisper", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ audio: base64 }),
        });
        const data = await res.json();
        const spokenText = (data.text || "").trim().toLowerCase();
        setResult(spokenText);
        setIsCorrect(spokenText === correctWord.toLowerCase());
      } catch (err) {
        console.error(err);
        alert("Whisper API алдаа гарлаа");
      }
    };
  };

  return (
    <div>
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`p-2 rounded ${recording ? "bg-red-500" : "bg-blue-500"} text-white`}
      >
        {recording ? "Бичиж байна..." : "Микрофоноор унших"}
      </button>

      {result && (
        <p>
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
};
