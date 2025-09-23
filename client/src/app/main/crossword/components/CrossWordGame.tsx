"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Target,
  Search,
  RotateCcw,
  CheckCircle,
  ImageIcon,
  BarChart3,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useTextSpeaker } from "@/provider/TextContext";
import { WordData, levels } from "../../../utils/data";

type Cell = {
  letter: string;
  isSelected: boolean;
  isFound: boolean;
  wordId?: number;
};

interface CrossWordProps {
  levelIndex: number;
  wordsForLevel?: number[]; 
  onNext: () => void;
}

export default function CrossWordGame({ levelIndex, onNext }: CrossWordProps) {
  const router = useRouter();
  const { speakText } = useTextSpeaker();
  const rows = 6;
  const cols = 6;

  const [grid, setGrid] = useState<Cell[][]>([]);
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [activeWords, setActiveWords] = useState<WordData[]>([]);

  useEffect(() => {
    const wordsForLevel = levels[levelIndex] || [];
    if (!wordsForLevel || wordsForLevel.length === 0) return;

    setActiveWords(wordsForLevel);
    setFoundWords([]);
    setSelectedCells([]);
    setGrid(generateGrid(rows, cols, wordsForLevel.map(w => w.word)));
  }, [levelIndex]);

  function generateGrid(r: number, c: number, wordList: string[]): Cell[][] {
    const letters = "масрхвлншэиоуөү";
    const grid: Cell[][] = Array.from({ length: r }, () =>
      Array.from({ length: c }, () => ({ letter: "", isSelected: false, isFound: false }))
    );

    wordList.forEach((word, idx) => {
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * r);
        const col = Math.floor(Math.random() * (c - word.length + 1));
        let canPlace = true;
        for (let i = 0; i < word.length; i++) {
          if (grid[row][col + i].letter && grid[row][col + i].letter !== word[i]) {
            canPlace = false;
            break;
          }
        }
        if (canPlace) {
          for (let i = 0; i < word.length; i++) {
            grid[row][col + i] = { letter: word[i], isSelected: false, isFound: false, wordId: idx };
          }
          placed = true;
        }
      }
    });

    for (let rIdx = 0; rIdx < r; rIdx++)
      for (let cIdx = 0; cIdx < c; cIdx++)
        if (!grid[rIdx][cIdx].letter)
          grid[rIdx][cIdx].letter = letters[Math.floor(Math.random() * letters.length)];

    return grid;
  }

  function toggleCell(row: number, col: number) {
    setGrid(prev => {
      const newGrid = prev.map(r => r.map(c => ({ ...c })));
      const cell = newGrid[row][col];
      if (cell.isFound) return newGrid;

      cell.isSelected = !cell.isSelected;
      let newSelected = [...selectedCells];
      if (cell.isSelected) newSelected.push([row, col]);
      else newSelected = newSelected.filter(([r, c]) => !(r === row && c === col));
      setSelectedCells(newSelected);

      checkForWord(newGrid, newSelected);
      return newGrid;
    });
  }

  function checkForWord(newGrid: Cell[][], selection: [number, number][]) {
    const selectedWord = selection.map(([r, c]) => newGrid[r][c].letter).join("");
    activeWords.forEach(w => {
      if (selectedWord === w.word && !foundWords.includes(w.word)) {
        selection.forEach(([r, c]) => { newGrid[r][c].isFound = true; newGrid[r][c].isSelected = false; });
        setFoundWords([...foundWords, w.word]);
        setSelectedCells([]);
      }
    });
  }

  const resetGame = () => {
    const wordsForLevel = levels[levelIndex] || [];
    setFoundWords([]);
    setSelectedCells([]);
    setActiveWords(wordsForLevel);
    setGrid(generateGrid(rows, cols, wordsForLevel.map(w => w.word)));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Target className="w-8 h-8 text-gray-700" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Үг хайх тоглоом
            </h1>
            <Target className="w-8 h-8 text-gray-700" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Search className="w-5 h-5 text-gray-600" />
            <p className="text-gray-600 text-lg sm:text-xl">Зургийг олж, үгийг хай!</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-center">
          {/* Game Grid */}
          <div className="flex-1 flex flex-col items-center">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-lg">
              <div className="grid gap-1 sm:gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(40px,1fr))`, maxWidth: "320px" }}>
                {grid.map((row, rIdx) =>
                  row.map((cell, cIdx) => (
                    <button key={`${rIdx}-${cIdx}`} onClick={() => toggleCell(rIdx, cIdx)}
                      className={`flex items-center justify-center text-base sm:text-xl font-bold border-2 rounded-lg w-10 h-10 sm:w-12 sm:h-12 cursor-pointer
                        ${cell.isFound ? "bg-green-100 text-green-800 border-green-300 shadow-sm" : ""}
                        ${cell.isSelected ? "bg-blue-100 text-blue-800 border-blue-300 shadow-sm" : ""}
                        ${!cell.isFound && !cell.isSelected ? "bg-white text-gray-800 border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm" : ""}
                      `}>
                      {cell.letter}
                    </button>
                  ))
                )}
              </div>

              {/* Buttons */}
              <div className="mt-4 flex items-center justify-center gap-6">
                <button onClick={() => router.push("/")} className="w-16 h-12 bg-indigo-400 text-white rounded-lg shadow-lg hover:bg-indigo-500 flex items-center justify-center"><ArrowLeft className="w-6 h-6" /></button>
                <button onClick={resetGame} className="w-16 h-12 bg-gray-400 text-white rounded-lg shadow-lg hover:bg-gray-500 flex items-center justify-center"><RotateCcw className="w-6 h-6" /></button>
                <button onClick={onNext} disabled={foundWords.length !== activeWords.length}
                  className={`w-16 h-12 rounded-lg shadow-lg flex items-center justify-center ${foundWords.length === activeWords.length ? "bg-teal-400 text-white hover:bg-teal-500" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Word Images */}
          <div className="flex-1 max-w-sm">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-lg">
              <div className="flex items-center justify-center gap-2 mb-4">
                <ImageIcon className="w-6 h-6 text-gray-700" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">Зургууд</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {activeWords.map(w => (
                  <div key={w.word} onClick={() => speakText(w.word)} className={`relative group cursor-pointer ${foundWords.includes(w.word) ? "scale-105" : "hover:scale-110"}`}>
                    <div className={`relative overflow-hidden rounded-lg shadow-md border-2 transition-all duration-300 ${foundWords.includes(w.word) ? "border-green-300 bg-green-50" : "border-gray-200 hover:border-gray-300 bg-white"}`}>
                      <Image src={w.image} alt={w.word} width={80} height={80} className="w-full h-20 object-cover group-hover:brightness-105"/>
                      {foundWords.includes(w.word) && <div className="absolute inset-0 bg-green-100/80 flex items-center justify-center"><CheckCircle className="w-8 h-8 text-green-600"/></div>}
                      {!foundWords.includes(w.word) && <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><span className="text-white font-bold text-sm">{w.word}</span></div>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div className="mt-4 text-center">
                <div className="flex justify-center items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-semibold">{foundWords.length} / {activeWords.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gray-900 h-3 rounded-full transition-all" style={{ width: `${(foundWords.length / activeWords.length) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
