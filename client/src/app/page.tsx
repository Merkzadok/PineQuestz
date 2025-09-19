"use client";

import React, { useEffect, useState } from "react";
import { Lock, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface Level {
  id: number;
  route: string;
  section: string;
}

interface LessonProgress {
  levelId: number;
  completed: boolean;
}

const sectionColors: Record<string, { bg: string; dark: string }> = {
  Letters: { bg: "bg-cyan-200", dark: "bg-cyan-400" },
  Colors: { bg: "bg-orange-200", dark: "bg-orange-400" },
  Animals: { bg: "bg-purple-200", dark: "bg-purple-400" },
  Food: { bg: "bg-green-200", dark: "bg-green-400" },
  Misc: { bg: "bg-pink-200", dark: "bg-pink-400" },
};

export default function RoadMap() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  const levels: Level[] = [
    { id: 1, route: "/main/crossword/1", section: "Letters" },
    { id: 2, route: "/main/crossword/2", section: "Letters" },
    { id: 3, route: "/main/wordSentence", section: "Letters" },
    { id: 4, route: "/main/wordSentence", section: "Letters" },
    { id: 5, route: "/main/wordSentence", section: "Letters" },

    { id: 6, route: "/main/wordSentence", section: "Colors" },
    { id: 7, route: "/main/wordSentence", section: "Colors" },
    { id: 8, route: "/main/wordSentence", section: "Colors" },
    { id: 9, route: "/main/wordSentence", section: "Colors" },
    { id: 10, route: "/main/wordSentence", section: "Colors" },

    { id: 11, route: "/main/wordSentence", section: "Animals" },
    { id: 12, route: "/main/wordSentence", section: "Animals" },
    { id: 13, route: "/main/wordSentence", section: "Animals" },
    { id: 14, route: "/main/wordSentence", section: "Animals" },
    { id: 15, route: "/main/wordSentence", section: "Animals" },

    { id: 16, route: "/main/wordSentence", section: "Food" },
    { id: 17, route: "/main/wordSentence", section: "Food" },
    { id: 18, route: "/main/wordSentence", section: "Food" },
    { id: 19, route: "/main/wordSentence", section: "Food" },
    { id: 20, route: "/main/wordSentence", section: "Food" },
  ];

  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>(
    levels.map((level) => ({
      levelId: level.id,
      completed: false,
    }))
  );

  useEffect(() => {
    setIsLoaded(true);

    const savedProgress = levels.map((level) => ({
      levelId: level.id,
      completed: localStorage.getItem(`level${level.id}`) === "completed",
    }));

    setLessonProgress(savedProgress);
  }, []);

  const getLevelStatus = (level: Level) => {
    const prevLevel = levels[level.id - 2];
    const prevCompleted = prevLevel
      ? lessonProgress.find((l) => l.levelId === prevLevel.id)?.completed
      : true;
    const currentProgress = lessonProgress.find((l) => l.levelId === level.id);

    if (!prevCompleted) return "locked";
    if (currentProgress?.completed) return "completed";
    return "current";
  };

  const handleLevelClick = (level: Level) => {
    if (getLevelStatus(level) === "locked") return;
    router.push(level.route);
  };

  // Helper to alternate position for zig-zag
  const getZigZagClass = (index: number) =>
    index % 2 === 0 ? "mt-0" : "mt-12";

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">Roadmap</h1>
        <p className="text-blue-600">
          Follow the winding path and complete each section!
        </p>
      </div>

      {/* Roadmap Sections */}
      {Array.from(new Set(levels.map((l) => l.section))).map((sectionName) => (
        <div key={sectionName} className="flex flex-col items-center mb-16">
          <h2
            className={`text-2xl font-bold mb-6`}
            style={{ color: sectionColors[sectionName].dark }}
          >
            {sectionName}
          </h2>

          <div className="flex flex-wrap justify-center gap-8 relative">
            {levels
              .filter((l) => l.section === sectionName)
              .map((level, idx) => {
                const status = getLevelStatus(level);
                const color = sectionColors[sectionName];

                let bg = color.bg;
                let iconColor = "text-gray-400";

                if (status === "completed") {
                  bg = "bg-green-200";
                  iconColor = "text-green-700";
                } else if (status === "current") {
                  bg = color.dark;
                  iconColor = "text-white";
                }

                return (
                  <div
                    key={level.id}
                    className={`flex flex-col items-center ${getZigZagClass(
                      idx
                    )}`}
                  >
                    <button
                      onClick={() => handleLevelClick(level)}
                      disabled={status === "locked"}
                      className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-transform duration-300 hover:scale-110 ${bg}`}
                    >
                      {status === "completed" ? (
                        <CheckCircle className={`w-6 h-6 ${iconColor}`} />
                      ) : status === "current" ? (
                        <span className={`text-lg font-bold ${iconColor}`}>
                          {level.id}
                        </span>
                      ) : (
                        <Lock className={`w-5 h-5 ${iconColor}`} />
                      )}
                    </button>
                    <span className="mt-2 text-sm font-medium text-blue-800">
                      {level.id}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      ))}

      {/* Footer Stats */}
      <div className="mt-12 text-center">
        <div className="flex justify-center gap-8 text-blue-700 text-sm font-medium">
          <div>
            <span className="font-bold">
              {lessonProgress.filter((l) => l.completed).length}
            </span>{" "}
            Completed
          </div>
          <div>
            <span className="font-bold">
              {lessonProgress.filter((l) => !l.completed).length}
            </span>{" "}
            Remaining
          </div>
        </div>
      </div>
    </div>
  );
}
