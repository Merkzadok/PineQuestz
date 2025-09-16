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
  const rows = 10;
  const cols = 10;
  const words: Word[] = [
    { word: "", image: "/images/cat.webp" },
    { word: "DOG", image: "/images/dog.png" },
    { word: "FISH", image: "/images/fish.png" },
    { word: "BIRD", image: "/images/bird.png" },
    { word: "LION", image: "/images/lion.png" },
    { word: "BEAR", image: "/images/bear.png" },
    { word: "DUCK", image: "/images/duck.png" },
    { word: "MOUSE", image: "/images/mouse.png" },
    { word: "HORSE", image: "/images/horse.png" },
    { word: "FROG", image: "/images/frog.png" },
  ];

  const [grid, setGrid] = useState<Cell[][]>([]);
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);

  // Generate grid on mount
  useEffect(() => {
    setGrid(generateGrid(rows, cols, words));
  }, []);

  function generateGrid(r: number, c: number, words: string[]): Cell[][] {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const grid: Cell[][] = Array.from({ length: r }, () =>
      Array.from({ length: c }, () => ({
        letter: "",
        isSelected: false,
        isFound: false,
      }))
    );

    // Place words horizontally (for simplicity, you can add vertical/diagonal later)
    words.forEach((word, idx) => {
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * r);
        const col = Math.floor(Math.random() * (c - word.length + 1));

        // Check if space free
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

    // Fill empty cells with random letters
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

      // Ignore clicks on already found cells
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

    words.forEach((word) => {
      if (selectedWord === word && !foundWords.includes(word)) {
        // Mark all selected cells as found
        selection.forEach(([r, c]) => {
          newGrid[r][c].isFound = true;
          newGrid[r][c].isSelected = false;
        });
        setFoundWords([...foundWords, word]);
        setSelectedCells([]);
      }
    });
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Word Search Game</h1>

      {/* Grid */}
      <div
        className="grid gap-1 mb-6"
        style={{ gridTemplateColumns: `repeat(${cols}, 40px)` }}
      >
        {grid.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              onClick={() => toggleCell(rIdx, cIdx)}
              className={`flex items-center justify-center text-lg font-bold border border-gray-300 rounded w-10 h-10 cursor-pointer
                ${cell.isFound ? "bg-green-400" : ""}
                ${cell.isSelected ? "bg-blue-300" : ""}
                ${!cell.isFound && !cell.isSelected ? "bg-white" : ""}
                text-black`}
            >
              {cell.letter}
            </div>
          ))
        )}
      </div>

      {/* Word list with images */}
      <div className="flex flex-wrap gap-4">
        {words.map((w) => (
          <div
            key={w.word}
            className={`flex items-center gap-2 px-3 py-2 rounded border text-black ${
              foundWords.includes(w.word) ? "bg-green-400" : "bg-gray-200"
            }`}
          >
            <Image
              src={w.image}
              alt={w.word}
              width={32}
              height={32}
              className="rounded"
            />
            <span>{w.word}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
