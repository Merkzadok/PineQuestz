"use client";
import { useState, useEffect } from "react";

export default function WordGridPage() {
  const [grid, setGrid] = useState<string[][]>([]);

  // Grid size (you can tweak)
  const rows = 8;
  const cols = 8;

  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const newGrid: string[][] = [];

    for (let r = 0; r < rows; r++) {
      const row: string[] = [];
      for (let c = 0; c < cols; c++) {
        const randomLetter =
          letters[Math.floor(Math.random() * letters.length)];
        row.push(randomLetter);
      }
      newGrid.push(row);
    }

    setGrid(newGrid);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${cols}, 50px)` }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="flex items-center justify-center bg-white text-xl font-bold border border-gray-300 rounded shadow-sm w-12 h-12"
            >
              {cell}
            </div>
          ))
        )}
      </div>
    </main>
  );
}
