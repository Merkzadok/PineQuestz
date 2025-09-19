"use client";

import { useState } from "react";
import { WordData } from "../utils/data";
import { DragDropWord } from "./DragDropWord";
import Image from "next/image";
import { useTextSpeaker } from "@/provider/TextContext";
import { Volume2 } from "lucide-react";

interface Props {
  wordData: WordData;
  onNext: (correct: boolean) => void;
}

// 🎤 Web Speech API аудио recorder
const AudioRecorderWebSpeech: React.FC<{ onResult: (text: string) => void }> = ({ onResult }) => {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Your browser does not support SpeechRecognition");

    const recognition = new SpeechRecognition();
    recognition.lang = "mn-MN"; // Монгол хэл
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      onResult(transcript);
    };

    recognition.onend = () => setListening(false);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={startListening}
        className={`px-4 py-2 rounded-lg text-white ${listening ? "bg-red-500" : "bg-green-500"}`}
      >
        {listening ? "Listening..." : "Start Recording"}
      </button>
      {text && <p className="mt-2 font-bold">💬 {text}</p>}
    </div>
  );
};

export const WordCard: React.FC<Props> = ({ wordData, onNext }) => {
  const { speakText } = useTextSpeaker();
  const [slots, setSlots] = useState<(string | null)[]>([]);
  const [showPopup, setShowPopup] = useState<string | null>(null);
  const [audioText, setAudioText] = useState("");

  const handleCheckOrNext = () => {
    const currentWord = slots.filter(Boolean).join("");
    const correct = currentWord === wordData.word;
    setShowPopup(correct ? `🎉 Зөв байна! ${wordData.word} 🟢` : `😅 Буруу байна`);
    setTimeout(() => setShowPopup(null), 2000);
    if (correct) onNext(true);
  };

  const handleAudioResult = (spokenText: string) => {
    setAudioText(spokenText);
    if (spokenText.trim() === wordData.word) {
      setShowPopup(`🎉 Зөв байна! ${spokenText} 🟢`);
      setTimeout(() => setShowPopup(null), 2000);
      onNext(true);
    } else {
      setShowPopup(`😅 Буруу байна: ${spokenText}`);
      setTimeout(() => setShowPopup(null), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center w-full max-w-lg mx-auto">
      {wordData.image && (
        <div className="relative mb-4 group">
          <Image
            src={wordData.image}
            alt={wordData.word}
            width={200}
            height={200}
            className="object-contain rounded-lg shadow-md cursor-pointer"
          />
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity">
            <Volume2
              onClick={() => speakText(wordData.word)}
              className="text-white cursor-pointer"
            />
          </div>
        </div>
      )}

      <DragDropWord
        word={wordData.word}
        letters={wordData.letters}
        onSlotsChange={setSlots}
      />

      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={handleCheckOrNext}
          className="mt-4 px-6 py-2 rounded-full shadow-md text-lg font-bold bg-green-500 text-white hover:bg-green-600"
        >
          Шалгах
        </button>
      </div>

      {/* 🎤 Web Speech API Recorder */}
      <div className="mt-6 w-full">
        <AudioRecorderWebSpeech onResult={handleAudioResult} />
      </div>

      {/* 🎯 Unshsan text дэлгэц дээр харуулах */}
      {audioText && (
        <p className="mt-4 text-lg font-bold text-center">
          💬 Unshsan text: {audioText}
        </p>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white px-6 py-4 rounded-2xl shadow-2xl text-xl font-bold text-center transform transition-all duration-500 ease-out scale-110 -translate-y-4 opacity-100">
            {showPopup}
          </div>
        </div>
      )}
    </div>
  );
};
