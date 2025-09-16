"use client";
import { useState, useEffect } from "react";
import { words as allWords, WordData } from "../utils/data";
import { AudioRecorder } from "./AudioRecorder";

interface Level {
  id: number;
  words: WordData[];
  unlocked: boolean;
  completed: boolean;
}

const WORDS_PER_LEVEL = 5;

export default function RoadmapPage() {
  const [levels, setLevels] = useState<Level[]>([]);

  useEffect(() => {
    const shuffledWords = [...allWords].sort(() => Math.random() - 0.5);
    const newLevels: Level[] = [];

    for (let i = 0; i < 4; i++) {
      newLevels.push({
        id: i + 1,
        words: shuffledWords.slice(i * WORDS_PER_LEVEL, (i + 1) * WORDS_PER_LEVEL),
        unlocked: i === 0,
        completed: false,
      });
    }
    setLevels(newLevels);
  }, []);

  const completeLevel = (levelId: number) => {
    setLevels((prev) =>
      prev.map((l) => {
        if (l.id === levelId) return { ...l, completed: true };
        if (l.id === levelId + 1) return { ...l, unlocked: true };
        return l;
      })
    );
  };

  return (
    <div className="p-8 space-y-8">
      {levels.map((level) => {
        const completion = Math.round(
          (level.words.filter((w) => w.completed).length / WORDS_PER_LEVEL) * 100
        );
        return (
          <div
            key={level.id}
            className={`p-4 border rounded-md transition-all duration-500 ${
              level.unlocked ? "bg-green-50" : "bg-gray-200 opacity-50"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Level {level.id}</h2>
              <div className="flex items-center gap-2">
                <span>{completion}%</span>
                <span className="text-yellow-400">{level.completed ? "⭐️" : "☆"}</span>
              </div>
            </div>

            {level.unlocked ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {level.words.map((word) => (
                  <WordCard
                    key={word.id}
                    wordData={word}
                    onCorrect={() => {
                      word.completed = true; // Word completion
                      const allCorrect = level.words.every((w) => w.completed);
                      if (allCorrect) completeLevel(level.id);
                    }}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Энэ түвшин unlock болоогүй байна</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// --- WordCard Component ---
interface WordCardProps {
  wordData: WordData & { completed?: boolean };
  onCorrect?: () => void;
}

const WordCard: React.FC<WordCardProps> = ({ wordData, onCorrect }) => {
  const [userLetters, setUserLetters] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const addLetter = (letter: string) => {
    if (userLetters.length < wordData.word.length) {
      setUserLetters([...userLetters, letter]);
    }
  };

  const checkAnswer = () => {
    const correct = userLetters.join("") === wordData.word;
    setIsCorrect(correct);
    if (correct && onCorrect) onCorrect();
  };

  const reset = () => {
    setUserLetters([]);
    setIsCorrect(null);
  };

  return (
    <div className={`border p-4 rounded-md shadow-md transition-all duration-300 ${isCorrect ? "border-green-500" : ""}`}>
      <img
        src={wordData.image}
        alt={wordData.word}
        className="w-full h-48 object-contain"
      />

      <div className="mt-2 flex flex-wrap gap-2">
        {wordData.letters.map((letter, idx) => (
          <button
            key={idx}
            onClick={() => addLetter(letter)}
            className="p-2 border rounded hover:bg-gray-100 transition"
          >
            {letter}
          </button>
        ))}
      </div>

      <p className="mt-2">Таны сонгосон үсгүүд: {userLetters.join("")}</p>
      {isCorrect !== null && (
        <p className={isCorrect ? "text-green-600" : "text-red-600"}>
          {isCorrect ? "Зөв!" : "Буруу!"}
        </p>
      )}

      <div className="mt-2 flex gap-2">
        <button
          onClick={checkAnswer}
          className="p-2 bg-green-500 text-white rounded"
        >
          Шалгах
        </button>
        <button
          onClick={reset}
          className="p-2 bg-gray-400 text-white rounded"
        >
          Дахин хийх
        </button>
      </div>

      <AudioRecorder correctWord={wordData.word} />
    </div>
  );
};
