import React from "react";

interface StreakDisplayProps {
  streak: number;
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({ streak }) => {
  return (
    <div className="mb-6 w-full max-w-md flex justify-between items-center bg-white shadow-lg rounded-2xl px-6 py-4 border border-gray-200">
      <p className="text-lg font-semibold text-gray-700">Streak:</p>
      <p className="text-2xl font-bold text-green-600">{streak}</p>
    </div>
  );
};
