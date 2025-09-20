"use client";
import { useState, useEffect } from "react";
import { words as allWords, WordData } from "./utils/data";
import { WordCard } from "./components/WordCard";
import { ProgressBar } from "./components/ProgressBar";
import { StreakDisplay } from "./components/StreakDisplay";

export default function Home() {
  const [words, setWords] = useState<WordData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setWords((allWords));
  }, []);

  const handleNext = (correct: boolean) => {
    setStreak((prev) => (correct ? prev + 1 : 0));
    setCurrentIndex((prev) => (prev + 1 < words.length ? prev + 1 : words.length));

  };

  if (!words.length)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-50">
        <p className="text-blue-400 text-xl animate-pulse">Loading...</p>
      </div>
    );

  if (currentIndex >= words.length)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-50 px-4">
        <p className="text-3xl font-bold mb-4 text-green-600">🎉 Тоглолт дууслаа!</p>
        <p className="text-xl text-gray-700">
          Таны Streak: <span className="font-semibold text-green-600">{streak}</span>
        </p>
        <button
          onClick={() => {
            setCurrentIndex(0);
            setStreak(0);
          }}
          className="mt-6 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 shadow-lg transition"
        >
          Дахин эхлэх
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 flex flex-col items-center justify-start px-4 pt-8">
      {/* Progress bar */}
      <ProgressBar currentIndex={currentIndex} total={words.length} />

      {/* Streak display */}
      <StreakDisplay streak={streak} />

      {/* Word card */}
      <div className="w-full max-w-md">
        <WordCard
          key={words[currentIndex].id}
          wordData={words[currentIndex]}
          onNext={handleNext}

        />
      </div>
    </div>
  );
}

