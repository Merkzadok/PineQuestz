"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Target,
  Search,
  RotateCcw,
  Trophy,
  CheckCircle,
  ImageIcon,
  BarChart3,
} from "lucide-react";
import { useTextSpeaker } from "@/provider/TextContext";

type Cell = {
  letter: string;
  isSelected: boolean;
  isFound: boolean;
  wordId?: number;
};

type Word = {
  word: string;
  image: string;
};

export default function CrossWordLevel1() {
  const router = useRouter();
  const rows = 6;
  const cols = 6;

  const { speakText } = useTextSpeaker();

  const words: Word[] = [
    { word: "сүх", image: "/images/axe.avif" },
    { word: "ном", image: "/images/book.jpeg" },
    { word: "морь", image: "/images/horse.jpg" },
    { word: "сар", image: "/images/moon.jpg" },
    { word: "шоо", image: "/images/cube.jpeg" },
    { word: "хавар", image: "/images/spring.webp" },
    { word: "хүүхэд", image: "/images/child.webp" },
    { word: "хөлөг", image: "/images/ship.jpeg" },
    { word: "үхэр", image: "/images/cow.webp" },
  ];

  const [grid, setGrid] = useState<Cell[][]>([]);
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [activeWords, setActiveWords] = useState<Word[]>([]);

  function getRandomWords(list: Word[], count: number): Word[] {
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  useEffect(() => {
    const selected = getRandomWords(words, 5);
    setActiveWords(selected);
    setGrid(
      generateGrid(
        rows,
        cols,
        selected.map((w) => w.word)
      )
    );
  }, []);

  function generateGrid(r: number, c: number, wordList: string[]): Cell[][] {
    const letters = "масрхвлншэиоуөү";
    const grid: Cell[][] = Array.from({ length: r }, () =>
      Array.from({ length: c }, () => ({
        letter: "",
        isSelected: false,
        isFound: false,
      }))
    );

    wordList.forEach((word, idx) => {
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * r);
        const col = Math.floor(Math.random() * (c - word.length + 1));

        let canPlace = true;
        for (let i = 0; i < word.length; i++) {
          if (
            grid[row][col + i].letter &&
            grid[row][col + i].letter !== word[i]
          ) {
            canPlace = false;
            break;
          }
        }

        if (canPlace) {
          for (let i = 0; i < word.length; i++) {
            grid[row][col + i] = {
              letter: word[i],
              isSelected: false,
              isFound: false,
              wordId: idx,
            };
          }
          placed = true;
        }
      }
    });

    for (let rIdx = 0; rIdx < r; rIdx++) {
      for (let cIdx = 0; cIdx < c; cIdx++) {
        if (!grid[rIdx][cIdx].letter) {
          grid[rIdx][cIdx].letter =
            letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }

    return grid;
  }

  function toggleCell(row: number, col: number) {
    setGrid((prev) => {
      const newGrid = prev.map((r) => r.map((cell) => ({ ...cell })));
      const cell = newGrid[row][col];

      if (cell.isFound) return newGrid;

      cell.isSelected = !cell.isSelected;

      let newSelected = [...selectedCells];
      if (cell.isSelected) {
        newSelected.push([row, col]);
      } else {
        newSelected = newSelected.filter(([r, c]) => !(r === row && c === col));
      }
      setSelectedCells(newSelected);

      checkForWord(newGrid, newSelected);

      return newGrid;
    });
  }

  function checkForWord(newGrid: Cell[][], selection: [number, number][]) {
    const selectedWord = selection
      .map(([r, c]) => newGrid[r][c].letter)
      .join("");
    activeWords.forEach((w) => {
      if (selectedWord === w.word && !foundWords.includes(w.word)) {
        selection.forEach(([r, c]) => {
          newGrid[r][c].isFound = true;
          newGrid[r][c].isSelected = false;
        });
        setFoundWords([...foundWords, w.word]);
        setSelectedCells([]);
      }
    });
  }

  const resetGame = () => {
    setFoundWords([]);
    setSelectedCells([]);
    const selected = getRandomWords(words, 5);
    setActiveWords(selected);
    setGrid(
      generateGrid(
        rows,
        cols,
        selected.map((w) => w.word)
      )
    );
  };

  const handleContinue = () => {
    // Save progress to localStorage
    localStorage.setItem("level1", "completed");
    localStorage.setItem("level1-stars", "3");

    // Redirect back to roadmap
    router.push("/roadmap");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Target className="w-8 h-8 text-gray-700" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Үгийг хайх тоглоом
            </h1>
            <Target className="w-8 h-8 text-gray-700" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Search className="w-5 h-5 text-gray-600" />
            <p className="text-gray-600 text-lg sm:text-xl">
              Зургийг олж, үгийг хай!
            </p>
          </div>

          {/* Completion Message */}
          {activeWords.length > 0 &&
            foundWords.length === activeWords.length && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-8 h-8 text-green-600 animate-pulse" />
                    <p className="text-green-800 text-xl font-bold">
                      Баяр хүргэе! Бүх үгийг оллоо!
                    </p>
                    <Trophy className="w-8 h-8 text-green-600 animate-pulse" />
                  </div>

                  {/* Continue Button */}
                  <button
                    onClick={handleContinue}
                    className="mt-4 px-6 py-3 bg-gray-900 text-white font-bold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-gray-800"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-center">
          {/* Game Grid */}
          <div className="flex-1 flex flex-col items-center">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-lg">
              <div
                className="grid gap-1 sm:gap-2"
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(40px, 1fr))`,
                  maxWidth: "320px",
                }}
              >
                {grid.map((row, rIdx) =>
                  row.map((cell, cIdx) => (
                    <button
                      key={`${rIdx}-${cIdx}`}
                      onClick={() => toggleCell(rIdx, cIdx)}
                      className={`
                        flex items-center justify-center text-base sm:text-xl font-bold border-2 rounded-lg w-10 h-10 sm:w-12 sm:h-12 cursor-pointer
                        transform transition-all duration-200 hover:scale-110 active:scale-95
                        ${
                          cell.isFound
                            ? "bg-green-100 text-green-800 border-green-300 shadow-sm"
                            : ""
                        }
                        ${
                          cell.isSelected
                            ? "bg-blue-100 text-blue-800 border-blue-300 shadow-sm"
                            : ""
                        }
                        ${
                          !cell.isFound && !cell.isSelected
                            ? "bg-white text-gray-800 border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm"
                            : ""
                        }
                      `}
                    >
                      {cell.letter}
                    </button>
                  ))
                )}
              </div>

              {/* Reset Button */}
              <button
                onClick={resetGame}
                className="mt-4 flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-bold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-gray-800"
              >
                <RotateCcw className="w-5 h-5" />
                Шинэ тоглоом
              </button>
            </div>
          </div>

          {/* Word Images */}
          <div className="flex-1 max-w-sm">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-lg">
              <div className="flex items-center justify-center gap-2 mb-4">
                <ImageIcon className="w-6 h-6 text-gray-700" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
                  Зургууд
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {activeWords.map((w) => (
                  <div
                    key={w.word}
                    onClick={() => speakText(w.word)}
                    className={`relative group cursor-pointer transform transition-all duration-300 ${
                      foundWords.includes(w.word)
                        ? "scale-105"
                        : "hover:scale-110"
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden rounded-lg shadow-md border-2 transition-all duration-300 ${
                        foundWords.includes(w.word)
                          ? "border-green-300 bg-green-50"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <Image
                        src={w.image}
                        alt={w.word}
                        width={80}
                        height={80}
                        className="w-full h-20 object-cover transition-all duration-300 group-hover:brightness-105"
                      />

                      {/* Found overlay */}
                      {foundWords.includes(w.word) && (
                        <div className="absolute inset-0 bg-green-100/80 flex items-center justify-center">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                      )}

                      {/* Hover overlay to show word */}
                      {!foundWords.includes(w.word) && (
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {w.word}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mt-4 text-center">
                <div className="flex justify-center items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-semibold">
                    {foundWords.length} / {activeWords.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gray-900 h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        (foundWords.length / activeWords.length) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
