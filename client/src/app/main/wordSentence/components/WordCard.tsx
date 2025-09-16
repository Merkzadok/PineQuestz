"use client";

import { useState, useEffect } from "react";
import { WordData } from "../utils/data";

interface WordCardProps {
  wordData: WordData;
  onNext: (correct: boolean) => void;
}

interface SelectedLetter {
  letter: string;
  pos: number; // position in the word
}

const WordCard: React.FC<WordCardProps> = ({ wordData, onNext }) => {
  const [userLetters, setUserLetters] = useState<SelectedLetter[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [popIndex, setPopIndex] = useState<number | null>(null);

  // Animate the latest added letter
  useEffect(() => {
    if (popIndex !== null) {
      const timer = setTimeout(() => setPopIndex(null), 200);
      return () => clearTimeout(timer);
    }
  }, [popIndex]);

  // Add a letter to the next available position
  const addLetter = (letter: string) => {
    if (userLetters.length < wordData.word.length) {
      const nextPos = userLetters.length;
      setUserLetters([...userLetters, { letter, pos: nextPos }]);
      setPopIndex(nextPos);
    }
  };

  // Remove a specific letter when clicking on the selected letters
  const removeLetter = (index: number) => {
    const newLetters = userLetters.filter((_, i) => i !== index);
    setUserLetters(newLetters);
  };

  // Check if letters match
  const checkAnswer = () => {
    const userWord = userLetters.map((l) => l.letter).join("");
    setIsCorrect(userWord === wordData.word);
  };

  const handleNext = () => {
    onNext(isCorrect === true);
    setUserLetters([]);
    setIsCorrect(null);
    setPopIndex(null);
  };

  const handleReset = () => {
    setUserLetters([]);
    setIsCorrect(null);
    setPopIndex(null);
  };

  return (
    <div className="bg-gray-50 rounded-2xl shadow-xl p-6 flex flex-col items-center w-full max-w-md">
      {/* Image */}
      <img
        src={wordData.image}
        alt={wordData.word}
        className="w-64 h-64 object-contain rounded-lg mb-6 shadow"
      />

      {/* Letters Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {wordData.letters.map((letter, idx) => (
          <button
            key={idx}
            onClick={() => addLetter(letter)}
            className="w-12 h-12 flex items-center justify-center border rounded-xl text-lg font-medium hover:bg-gray-100 transition-colors"
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Selected Letters Display */}
      <div className="text-center mb-6 flex flex-wrap justify-center gap-2">
        {userLetters.map((l, idx) => {
          const correct = l.letter === wordData.word[idx];
          return (
            <span
              key={idx}
              onClick={() => removeLetter(idx)}
              className={`inline-block px-4 py-2 text-2xl font-bold rounded-lg cursor-pointer transition-all duration-200 transform ${
                correct ? "bg-green-500 text-white shadow-md" : "bg-yellow-400 text-black shadow-sm"
              } ${popIndex === idx ? "scale-125" : "scale-100"}`}
            >
              {l.letter}
            </span>
          );
        })}
      </div>

      {/* Result Text */}
      <div className="text-center mb-6">
        {isCorrect !== null && (
          <p className={`text-xl font-bold ${isCorrect ? "text-green-600" : "text-red-600"}`}>
            {isCorrect ? "Зөв!" : "Буруу!"}
          </p>
        )}
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
            style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}
          >
            Дараах
          </button>
        )}

        <button
          onClick={handleReset}
          className="px-6 py-2 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition shadow-md"
        >
          Дахин хийх
        </button>
      </div>
    </div>
  );
};

export default WordCard;
