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

  useEffect(() => {
    if (popIndex !== null) {
      const timer = setTimeout(() => setPopIndex(null), 200);
      return () => clearTimeout(timer);
    }
  }, [popIndex]);

  const toggleLetter = (letter: string) => {
    const newLetters = [...userLetters];

    // давхар letter-ийг зөв тохиолдолд зөв байрлалд нэмэх
    const firstEmpty = newLetters.indexOf(null);
    if (firstEmpty !== -1) {
      newLetters[firstEmpty] = letter;
      setPopIndex(firstEmpty);
    } else {
      // Letter-ийг арилгах (undo)
      const removeIdx = newLetters.indexOf(letter);
      if (removeIdx !== -1) newLetters[removeIdx] = null;
    }

    setUserLetters(newLetters);
  };

  const checkAnswer = () => {
    const correct = userLetters.join("") === wordData.word;
    setIsCorrect(correct);
  };

  const handleNext = () => {
    onNext(isCorrect === true);
    setUserLetters(Array(wordData.word.length).fill(null));
    setIsCorrect(null);
    setPopIndex(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center">
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
        {wordData.letters.map((letter, idx) => {
          const selectedIdx = userLetters.indexOf(letter);
          let bg = "bg-gray-200 hover:bg-gray-300";

          // зөв дарагдсан бол ногоон
          if (selectedIdx !== -1 && letter === wordData.word[selectedIdx]) bg = "bg-green-400 text-white";

          return (
            <button
              key={idx}
              onClick={() => toggleLetter(letter)}
              className={`w-12 h-12 flex items-center justify-center border rounded-xl font-medium transition-colors ${bg}`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {/* Selected Letters Display */}
      <div className="text-center mb-6 flex flex-wrap justify-center gap-2">
        {userLetters.map((letter, idx) => {
          let bg = "bg-gray-100 text-gray-700";
          if (letter) {
            bg = letter === wordData.word[idx] ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800";
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

        {isCorrect !== null && (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition shadow-lg text-xl font-bold"
          >
            Дараах
          </button>
        )}
      </div>
    </div>
  );
};

export default WordCard;
