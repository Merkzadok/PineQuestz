// WordCard.tsx
"use client";

import { useState, useEffect } from "react";
import { WordData } from "../utils/data";
import TextSpeaker from "../../chimegu/page";
interface WordCardProps {
  wordData: WordData;
  onNext: (correct: boolean) => void;
}

const WordCard: React.FC<WordCardProps> = ({ wordData, onNext }) => {
  const [userLetters, setUserLetters] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [highlighted, setHighlighted] = useState<boolean[]>(
    Array(wordData.word.length).fill(false)
  );
  const [popIndex, setPopIndex] = useState<number | null>(null); 

  const handleSpeakWord = () => {
    // TextSpeaker-ийн дууг тоглуулах
    const speaker = new Audio(); // шууд Audio ашиглах боломжтой
    fetch("http://localhost:4001/audio/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: wordData.word }),
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        speaker.src = url;
        speaker.play();
      })
      .catch((err) => console.error(err));
  };

  // Letter pop animation
  useEffect(() => {
    if (popIndex !== null) {
      const timer = setTimeout(() => setPopIndex(null), 200);
      return () => clearTimeout(timer);
    }
  }, [popIndex]);

  const addLetter = (letter: string) => {
    if (userLetters.length < wordData.word.length) {
      const nextIndex = userLetters.length;
      setUserLetters([...userLetters, letter]);
      setPopIndex(nextIndex);

      if (letter === wordData.word[nextIndex]) {
        const newHighlight = [...highlighted];
        newHighlight[nextIndex] = true;
        setHighlighted(newHighlight);
      }
    }
  };

  const checkAnswer = () => {
    const correct = userLetters.join("") === wordData.word;
    setIsCorrect(correct);
  };

  const handleNext = () => {
    onNext(isCorrect === true);
    setUserLetters([]);
    setIsCorrect(null);
    setHighlighted(Array(wordData.word.length).fill(false));
    setPopIndex(null);

    handleSpeakWord(); // дараагийн үгийг дуугаар тоглуулах
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center">
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
            className={`w-12 h-12 flex items-center justify-center border rounded-xl text-lg font-medium transition-colors ${
              highlighted[idx] ? "bg-green-100" : "hover:bg-gray-100"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Selected Letters Display */}
      <div className="text-center mb-6 flex flex-wrap justify-center gap-2">
        {userLetters.map((letter, idx) => (
          <span
            key={idx}
            className={`inline-block px-4 py-2 text-2xl font-bold rounded-lg transition-all duration-200 transform ${
              highlighted[idx] ? "bg-green-200 text-green-800" : "bg-blue-100 text-blue-700"
            } ${popIndex === idx ? "scale-125" : "scale-100"}`}
          >
            {letter}
          </span>
        ))}
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
          onClick={() => {
            setUserLetters([]);
            setIsCorrect(null);
            setHighlighted(Array(wordData.word.length).fill(false));
            setPopIndex(null);
          }}
          className="px-6 py-2 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition shadow-md"
        >
          Дахин хийх
        </button>

        {/* Speaker button */}
        <button
          onClick={handleSpeakWord}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition shadow-md"
        >
          🗣 Унших
        </button>
      </div>
    </div>
  );
};

export default WordCard;
