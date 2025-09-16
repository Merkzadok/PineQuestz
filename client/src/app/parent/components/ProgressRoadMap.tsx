"use client";
import React from "react";
import { TrendingUp } from "lucide-react";
import { RoadmapNode } from "./RoadMap";

interface Lesson {
  id: number;
  title: string;
  stars?: number;
}
interface ProgressRoadmapProps {
  lessons: Lesson[];
  currentLesson: number;
  onLessonSelect: (lesson: Lesson) => void;
}

export const ProgressRoadmap: React.FC<ProgressRoadmapProps> = ({
  lessons,
  currentLesson,
  onLessonSelect,
}) => {
  return (
    <div className="bg-white rounded-xl border p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-800">Таны явц</h3>
      </div>
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-1 bg-gray-200 rounded-full"></div>
        <div className="space-y-8">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="relative flex justify-center">
              <RoadmapNode
                lesson={lesson}
                isActive={lesson.id === currentLesson}
                isCompleted={lesson.id < currentLesson}
                isLocked={lesson.id > currentLesson}
                onClick={() => onLessonSelect(lesson)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
