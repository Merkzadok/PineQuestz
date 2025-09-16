"use client";
import React from "react";
import { BookOpen, CheckCircle, Lock } from "lucide-react";

interface Lesson {
  id: number;
  title: string;
}

interface RoadmapNodeProps {
  lesson: Lesson;
  isActive: boolean;
  isCompleted: boolean;
  isLocked: boolean;
  onClick: () => void;
}

export const RoadmapNode: React.FC<RoadmapNodeProps> = ({
  lesson,
  isActive,
  isCompleted,
  isLocked,
  onClick,
}) => {
  const getNodeStyle = () =>
    isCompleted
      ? "bg-green-500 text-white"
      : isActive
      ? "bg-white text-gray-800 border-green-500 ring-2 ring-green-200"
      : "bg-gray-200 text-gray-400";

  const getIcon = () =>
    isCompleted ? (
      <CheckCircle className="w-5 h-5" />
    ) : isLocked ? (
      <Lock className="w-5 h-5" />
    ) : (
      <BookOpen className="w-5 h-5" />
    );

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`relative p-4 rounded-full border-2 shadow-lg ${getNodeStyle()} ${
        !isLocked ? "hover:scale-105 active:scale-95" : "cursor-not-allowed"
      } ${isActive ? "animate-pulse" : ""}`}
    >
      {getIcon()}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">
        {lesson.id}
      </div>
    </button>
  );
};
