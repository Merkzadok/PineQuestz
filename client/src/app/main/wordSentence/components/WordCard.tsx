"use client";

import { useState, useEffect } from "react";
import { WordData } from "../utils/data";
import Image from "next/image";


interface WordCardProps {
  wordData: WordData;
  onNext: (correct: boolean) => void;
}

interface SelectedLetter {
  letter: string;
  index: number;
}

const WordCard: React.FC<WordCardProps> = ({ wordData, onNext }) => {
  const [selectedLetters, setSelectedLetters] = useState<SelectedLetter[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [popIndex, setPopIndex] = useState<number | null>(null);
  

  useEffect(() => {
    if (popIndex !== null) {
      const timer = setTimeout(() => setPopIndex(null), 200);
      return () => clearTimeout(timer);
    }
  }, [popIndex]);

  const addLetter = (letter: string, idx: number) => {
    if (selectedLetters.find((l) => l.index === idx)) return;
    if (selectedLetters.length < wordData.word.length) {
      setSelectedLetters([...selectedLetters, { letter, index: idx }]);
      setPopIndex(selectedLetters.length);
    }
  };

  const removeLetter = (pos: number) => {
    const newLetters = [...selectedLetters];
    newLetters.splice(pos, 1);
    setSelectedLetters(newLetters);
  };

  const checkAnswer = () => {
    const userWord = selectedLetters.map((l) => l.letter).join("");
    setIsCorrect(userWord === wordData.word);
  };

  const handleNext = () => {
    onNext(isCorrect === true);
    setSelectedLetters([]);
    setIsCorrect(null);
    setPopIndex(null);
  };

  const handleReset = () => {
    setSelectedLetters([]);
    setIsCorrect(null);
    setPopIndex(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center w-full max-w-md">
      {/* Image */}
    
<Image
  src={wordData.image}
  alt={wordData.word}
  width={256}
  height={256}
  className="rounded-lg mb-6 shadow object-contain"
/>

      {/* Letter buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {wordData.letters.map((letter, idx) => {
          const selected = selectedLetters.find((l) => l.index === idx);
          return (
            <button
              key={idx}
              onClick={() => addLetter(letter, idx)}
              disabled={!!selected}
              className={`w-12 h-12 flex items-center justify-center border rounded-xl text-lg font-medium transition-all duration-200 transform ${
                selected
                  ? "bg-green-700 text-white cursor-not-allowed"
                  : "bg-yellow-200 hover:bg-yellow-300 hover:scale-110"
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {/* Selected letters */}
      <div className="text-center mb-6 flex flex-wrap justify-center gap-2">
        {selectedLetters.map((l, idx) => (
          <span
            key={idx}
            onClick={() => removeLetter(idx)}
            className={`inline-block px-4 py-2 text-2xl font-bold rounded-lg cursor-pointer transition-all duration-200 transform bg-green-700 text-white ${
              popIndex === idx ? "scale-125" : "scale-100"
            }`}
          >
            {l.letter}
          </span>
        ))}
      </div>

      {/* Result */}
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
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
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
