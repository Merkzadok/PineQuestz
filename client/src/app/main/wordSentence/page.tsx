"use client";
import { useState, useEffect } from "react";
import { words as allWords, WordData } from "./utils/data";
import WordCard from "./components/WordCard";

export default function Home() {
  const [words, setWords] = useState<WordData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setWords(shuffleArray(allWords));
  }, []);

  const handleNext = (correct: boolean) => {
    if (correct) setStreak(streak + 1);
    else setStreak(0);

    setCurrentIndex((prev) => prev + 1);
  };

  if (!words.length)
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <p className="text-blue-400 text-xl animate-pulse">Loading...</p>
      </div>
    );

  if (currentIndex >= words.length)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-4">
        <p className="text-3xl font-bold mb-4 text-green-600">🎉 Тоглолт дууслаа!</p>
        <p className="text-xl text-gray-700">
          Таны Streak: <span className="font-semibold text-green-600">{streak}</span>
        </p>
        <button
          onClick={() => { setCurrentIndex(0); setStreak(0); }}
          className="mt-6 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
        >
          Дахин эхлэх
        </button>
      </div>
    );

  const progressPercent = ((currentIndex) / words.length) * 100;

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-start px-4 pt-8">
      {/* Progress bar */}
      <div className="w-full max-w-md mb-6">
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-4 bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1 text-right">
          {currentIndex} / {words.length} үг
        </p>
      </div>

      {/* Streak display */}
      <div className="mb-6 w-full max-w-md flex justify-between items-center bg-white shadow-md rounded-xl px-6 py-4 border border-gray-200">
        <p className="text-lg font-semibold text-gray-700">Streak:</p>
        <p className="text-2xl font-bold text-green-600">{streak}</p>
      </div>

      {/* Word card */}
      <div className="w-full max-w-md">
        <WordCard wordData={words[currentIndex]} onNext={handleNext} />
      </div>
    </div>
  );
}

// shuffle helper
const shuffleArray = <T,>(arr: T[]): T[] => {
  return arr
    .map((v) => ({ v, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ v }) => v);
};
