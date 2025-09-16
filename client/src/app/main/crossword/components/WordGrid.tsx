"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

type Cell = {
  letter: string;
  isSelected: boolean;
  isFound: boolean;
  wordId?: number;
};

type Word = {
  word: string;
  image: string; // path to image in /public/images
};

export default function WordSearchPage() {
  const rows = 6;
  const cols = 6;

  // Mongolian words + images
  const words: Word[] = [
    { word: "мал", image: "/images/sheep.jpg" },
    { word: "ном", image: "/images/book.jpeg" },
    { word: "морь", image: "/images/horse.jpg" },
    { word: "сар", image: "/images/moon.jpg" },
    { word: "шоо", image: "/images/cube.jpeg" },
  ];

  const [grid, setGrid] = useState<Cell[][]>([]);
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);

  // Generate grid on mount
  useEffect(() => {
    setGrid(
      generateGrid(
        rows,
        cols,
        words.map((w) => w.word)
      )
    );
  }, []);

  function generateGrid(r: number, c: number, wordList: string[]): Cell[][] {
    const letters = "масрхвлншАЭИОУӨҮ"; // allowed letters
    const grid: Cell[][] = Array.from({ length: r }, () =>
      Array.from({ length: c }, () => ({
        letter: "",
        isSelected: false,
        isFound: false,
      }))
    );

    // Place words horizontally (simple for now)
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

    // Fill remaining with random Mongolian letters
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

    words.forEach((w) => {
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
    setGrid(
      generateGrid(
        rows,
        cols,
        words.map((w) => w.word)
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-300 p-4 sm:p-6 ">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            🎯 Монгол Үгийн Сүлжээ 🎯
          </h1>
          <p className="text-white text-lg sm:text-xl drop-shadow">
            Зургийг олж, үгийг хай! 🔍
          </p>
          {foundWords.length === words.length && (
            <div className="mt-4 animate-bounce">
              <span className="text-4xl">🎉</span>
              <p className="text-yellow-200 text-xl font-bold">
                Баяр хүргэе! Бүх үгийг оллоо!
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-center">
          {/* Game Grid */}
          <div className="flex-1 flex flex-col items-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-2xl">
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
                        flex items-center justify-center 
                        text-base sm:text-xl font-bold 
                        border-2 border-white/50 rounded-xl 
                        w-10 h-10 sm:w-12 sm:h-12 
                        cursor-pointer shadow-lg
                        transform transition-all duration-200 
                        hover:scale-110 active:scale-95
                        ${
                          cell.isFound
                            ? "bg-gradient-to-br from-green-400 to-green-500 text-white shadow-green-300 border-green-300 animate-pulse"
                            : ""
                        }
                        ${
                          cell.isSelected
                            ? "bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-blue-300 border-blue-300"
                            : ""
                        }
                        ${
                          !cell.isFound && !cell.isSelected
                            ? "bg-gradient-to-br from-white to-gray-100 text-gray-800 hover:from-purple-100 hover:to-pink-100"
                            : ""
                        }
                      `}
                    >
                      {cell.letter}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetGame}
              className="mt-4 px-6 py-3 bg-green-200 text-white font-bold rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-xl"
            >
              🔄 Шинэ тоглоом
            </button>
          </div>

          {/* Word Images */}
          <div className="flex-1 max-w-sm">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-2xl">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
                🖼️ Зургууд
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {words.map((w, index) => (
                  <div
                    key={w.word}
                    className={`
                      relative group cursor-pointer
                      transform transition-all duration-300
                      ${
                        foundWords.includes(w.word)
                          ? "scale-105"
                          : "hover:scale-110"
                      }
                    `}
                  >
                    <div
                      className={`
                      relative overflow-hidden rounded-2xl shadow-lg
                      border-4 transition-all duration-300
                      ${
                        foundWords.includes(w.word)
                          ? "border-green-400 shadow-green-300/50"
                          : "border-purple-200 hover:border-purple-400"
                      }
                    `}
                    >
                      <Image
                        src={w.image}
                        alt={w.word}
                        width={80}
                        height={80}
                        className="w-full h-20 object-cover transition-all duration-300 group-hover:brightness-110"
                      />

                      {/* Found overlay */}
                      {foundWords.includes(w.word) && (
                        <div className="absolute inset-0 bg-green-400/20 flex items-center justify-center animate-pulse">
                          <span className="text-3xl animate-bounce">✅</span>
                        </div>
                      )}

                      {/* Word overlay on hover for debugging */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {w.word}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress indicator */}
              <div className="mt-4 text-center">
                <div className="flex justify-center items-center gap-2 mb-2">
                  <span className="text-2xl">📊</span>
                  <span className="text-gray-700 font-semibold">
                    {foundWords.length} / {words.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${(foundWords.length / words.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
