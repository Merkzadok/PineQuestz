"use client";
import React, { useState } from "react";
import { Mascot } from "@/app/parent/components/Mascot";
import { ProgressRoadmap } from "@/app/parent/components/ProgressRoadMap";

// Type definitions
interface Lesson {
  id: number;
  title: string;
}

const KidPage: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState<number>(1);

  const lessons: Lesson[] = [
    { id: 1, title: "Basic Greetings" },
    { id: 2, title: "Family Members" },
    { id: 3, title: "Colors & Numbers" },
    { id: 4, title: "Animals" },
    { id: 5, title: "Food & Drinks" },
    { id: 6, title: "Weather" },
    { id: 7, title: "Time & Days" },
    { id: 8, title: "Transportation" },
  ];

  const handleLessonSelect = (lesson: Lesson) => {
    if (lesson.id <= currentLesson) console.log("Starting lesson:", lesson.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      {/* Header with Mascot */}
      <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md flex flex-col items-center gap-4">
        <Mascot mood="happy" size="large" />
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Сайн байна уу!
        </h1>
        <p className="text-gray-600 text-center">
          Өнөөдөр суралцахад бэлэн үү?
        </p>
      </div>

      {/* Progress Roadmap */}
      <div className="mt-6 w-full max-w-md">
        <ProgressRoadmap
          lessons={lessons}
          currentLesson={currentLesson}
          onLessonSelect={handleLessonSelect}
        />
      </div>
    </div>
  );
};

export default KidPage;
