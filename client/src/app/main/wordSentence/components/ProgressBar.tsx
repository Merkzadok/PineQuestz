import React from "react";

interface ProgressBarProps {
  currentIndex: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentIndex, total }) => {
  const progressPercent = (currentIndex / total) * 100;

  return (
    <div className="w-full max-w-md mb-6">
      <div className="w-full h-4 bg-blue-200 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-4 bg-green-400 rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-1 text-right">
        {currentIndex} / {total} үг
      </p>
    </div>
  );
};
