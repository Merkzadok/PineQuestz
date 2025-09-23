"use client";

import { useRef, useState } from "react";
import { WordData } from "../../../utils/data";
import { DragDropWord } from "./DragDropWord";
import Image from "next/image";
import { useTextSpeaker } from "@/provider/TextContext";
import { Target, Volume2 } from "lucide-react";
import VoiceTranscriber from "./VoiceTranscriber";
import Celebration from "@/app/components/Celebration";

interface Props {
  wordData: WordData;
  onNext: (correct: boolean) => void;
}

export const WordCard: React.FC<Props> = ({ wordData, onNext }) => {
  const dragDropRef = useRef<{ resetSlots: () => void }>(null);
  const { speakText } = useTextSpeaker();
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [slots, setSlots] = useState<(string | null)[]>([]);
  const [celebrationStatus, setCelebrationStatus] = useState<
    "correct" | "wrong" | null
  >(null);

  // Called when speech-to-text matches the word
  const handleCorrectSpeech = () => {
    setCelebrationStatus("correct");
    setTimeout(() => onNext(true), 300);
  };

  const handleCheckOrNext = () => {
    if (isCorrect === null) {
      const correct = slots.join("") === wordData.word;
      setIsCorrect(correct);
      setCelebrationStatus(correct ? "correct" : "wrong");
    } else if (isCorrect) {
      onNext(true);
      setIsCorrect(null);
      dragDropRef.current?.resetSlots();
    } else {
      setIsCorrect(null);
      dragDropRef.current?.resetSlots();
    }
  };

  const handleSpeakSlots = () => {
    const currentWord = slots.filter(Boolean).join("");
    if (currentWord) speakText(currentWord);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-center space-x-4 p-4 rounded-2xl shadow-lg">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-500 text-center">
          Үг бүтээх тоглоом
        </h1>
      </div>

      {/* Image + text-to-speech */}
      {wordData.image && (
        <div className="relative mb-4 group mt-6">
          <Image
            src={wordData.image}
            alt={wordData.word}
            width={300}
            height={300}
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

      {/* Drag and drop letters */}
      <DragDropWord
        ref={dragDropRef}
        word={wordData.word}
        letters={wordData.letters}
        onSlotsChange={setSlots}
      />

      {/* Text-to-speech for current slots */}
      <Volume2
        onClick={handleSpeakSlots}
        className="w-10 h-10 text-green-600 cursor-pointer hover:text-green-800 transition mt-2"
      />

      {/* Speech-to-text */}
      <div className="flex flex-col items-center mt-4">
        <VoiceTranscriber
          targetWord={wordData.word}
          onCorrect={handleCorrectSpeech}
        />
      </div>

      {/* Check/Next button */}
      <div className="flex flex-col items-center mt-4">
        <button
          onClick={handleCheckOrNext}
          className={`mt-4 px-6 py-2 rounded-full shadow-md text-lg font-bold transition ${
            isCorrect === null
              ? "bg-green-500 text-white hover:bg-green-600"
              : isCorrect
              ? "bg-yellow-400 text-black hover:bg-yellow-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isCorrect === null ? "Шалгах" : isCorrect ? "Дараах" : "Дахин эхлэх"}
        </button>
      </div>

      {/* Celebration */}
      <Celebration
        status={celebrationStatus}
        word={wordData.word}
        onDone={() => setCelebrationStatus(null)}
      />
    </div>
  );
};

WordCard.displayName = "WordCard";
