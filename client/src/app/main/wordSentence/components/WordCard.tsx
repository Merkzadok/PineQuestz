"use client";

import { useState, useEffect } from "react";
import { WordData } from "../utils/data";

interface WordCardProps {
  wordData: WordData;
  onNext: (correct: boolean) => void;
}

const WordCard: React.FC<WordCardProps> = ({ wordData, onNext }) => {
  const [userLetters, setUserLetters] = useState<(string | null)[]>(
    Array(wordData.word.length).fill(null)
  );
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [popIndex, setPopIndex] = useState<number | null>(null);
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    if (popIndex !== null) {
      const timer = setTimeout(() => setPopIndex(null), 200);
      return () => clearTimeout(timer);
    }
  }, [popIndex]);

  useEffect(() => {
    if (showCongrats) {
      const timer = setTimeout(() => setShowCongrats(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showCongrats]);

const toggleLetter = (letter: string) => {
  const newLetters = [...userLetters];

  const letterCountInWord = wordData.word.split("").filter(l => l === letter).length;
  const letterCountInUser = newLetters.filter(l => l === letter).length;

  if (letterCountInUser >= letterCountInWord) {
    const removeIdx = newLetters.lastIndexOf(letter);
    if (removeIdx !== -1) {
      newLetters[removeIdx] = null;
    }
  } else {
    const emptyIndex = newLetters.findIndex((ch) => ch === null);
    if (emptyIndex !== -1) {
      newLetters[emptyIndex] = letter;
      setPopIndex(emptyIndex);
    }
  }

  setUserLetters(newLetters);
};


  const checkAnswer = () => {
    const correct = userLetters.join("") === wordData.word;
    setIsCorrect(correct);

    if (correct) {
      setShowCongrats(true);
    }
  };

  const handleNext = () => {
    onNext(true);
    resetState();
  };

  const handleRetry = () => {
    onNext(false);
    resetState();
  };

  const resetState = () => {
    setUserLetters(Array(wordData.word.length).fill(null));
    setIsCorrect(null);
    setPopIndex(null);
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center">
      {/* Congrats Popup */}
      {showCongrats && (
        <div className="absolute top-8 bg-green-500 text-white text-2xl font-bold px-6 py-3 rounded-xl shadow-lg animate-bounce">
          🎉 Баяр хүргэе! 🎉
        </div>
      )}

      {/* Image */}
      {wordData.image && (
        <img
          src={wordData.image}
          alt={wordData.word}
          className="w-64 h-64 object-contain rounded-lg mb-6 shadow"
        />
      )}

      {/* Letters Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {wordData.letters.map((letter, idx) => (
          <button
            key={idx}
            onClick={() => toggleLetter(letter)}
            className="w-12 h-12 flex items-center justify-center border rounded-xl font-medium bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Selected Letters Display */}
      <div className="text-center mb-6 flex flex-wrap justify-center gap-2">
        {userLetters.map((letter, idx) => {
          let bg = "bg-gray-100 text-gray-700";
          if (letter) {
            bg =
              letter === wordData.word[idx]
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800";
          }

          return (
            <span
              key={idx}
              className={`w-12 h-12 flex items-center justify-center text-2xl font-bold rounded-lg transition-all duration-200 transform ${
                popIndex === idx ? "scale-125" : "scale-100"
              } ${bg}`}
            >
              {letter || ""}
            </span>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        {isCorrect === null && (
          <button
            onClick={checkAnswer}
            className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition shadow-md text-lg"
          >
            Шалгах
          </button>
        )}

        {isCorrect === true && (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition shadow-lg text-xl font-bold"
          >
            Дараах
          </button>
        )}

        {isCorrect === false && (
          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-red-400 text-white rounded-full hover:bg-red-500 transition shadow-lg text-xl font-bold"
          >
            Дахин оролдох
          </button>
        )}
      </div>
    </div>
  );
};

export default WordCard;
