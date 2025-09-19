"use client";

import React, { useEffect, useState } from "react";
import { Lock, CheckCircle, Circle } from "lucide-react";
import { useRouter } from "next/navigation";

interface Level {
  id: number;
  route: string;
}

interface LessonProgress {
  levelId: number;
  completed: boolean;
}

export default function RoadMap() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  // Define levels and their game routes
  const levels: Level[] = [
    { id: 1, route: "/main/crossword/1" },
    { id: 2, route: "/main/crossword/2" },
    { id: 3, route: "/main/wordSentence" },
    { id: 4, route: "/main/wordSentence" },
    { id: 5, route: "/main/wordSentence" },
    { id: 6, route: "/main/wordSentence" },
    { id: 7, route: "/main/wordSentence" },
    { id: 8, route: "/main/wordSentence" },
    { id: 9, route: "/main/wordSentence" },
    { id: 10, route: "/main/wordSentence" },
    { id: 12, route: "/main/wordSentence" },
    { id: 13, route: "/main/wordSentence" },
    { id: 14, route: "/main/wordSentence" },
    { id: 15, route: "/main/wordSentence" },
    { id: 16, route: "/main/wordSentence" },
    { id: 17, route: "/main/wordSentence" },
    { id: 18, route: "/main/wordSentence" },
    { id: 19, route: "/main/wordSentence" },
    { id: 20, route: "/main/wordSentence" },
  ];

  // Load progress from localStorage or fallback
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>(
    levels.map((level) => ({
      levelId: level.id,
      completed: false,
    }))
  );

  useEffect(() => {
    setIsLoaded(true);

    // Load stored progress
    const savedProgress = levels.map((level) => {
      const completed =
        localStorage.getItem(`level${level.id}`) === "completed";
      return { levelId: level.id, completed };
    });
    setLessonProgress(savedProgress);
  }, []);

  const getLevelStatus = (level: Level) => {
    const prevLevel = levels[level.id - 2]; // previous level
    const prevCompleted = prevLevel
      ? lessonProgress.find((l) => l.levelId === prevLevel.id)?.completed
      : true; // first level always unlocked

    const currentProgress = lessonProgress.find((l) => l.levelId === level.id);

    if (!prevCompleted) return "locked";
    if (currentProgress?.completed) return "completed";
    return "current";
  };

  const handleLevelClick = (level: Level) => {
    const status = getLevelStatus(level);
    if (status === "locked") return;

    router.push(level.route);
  };

  const getLevelIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-6 h-6 text-gray-800" />;
      case "current":
        return <Circle className="w-6 h-6 text-gray-800" />;
      case "locked":
        return <Lock className="w-6 h-6 text-gray-400" />;
    }
  };

  const getLevelStyles = (status: string) => {
    const baseStyles =
      "relative w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-pointer";

    switch (status) {
      case "completed":
        return `${baseStyles} bg-white border-gray-800 hover:scale-110 hover:shadow-lg`;
      case "current":
        return `${baseStyles} bg-gray-800 border-gray-800 text-white hover:scale-110 hover:shadow-lg animate-pulse`;
      case "locked":
        return `${baseStyles} bg-gray-100 border-gray-300 cursor-not-allowed`;
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div
        className={`max-w-md w-full transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Level Progress
          </h1>
          <p className="text-gray-600">
            Complete each level to unlock the next
          </p>
        </div>

        {/* Roadmap */}
        <div className="relative ">
          {/* Connecting Lines */}
          <div className="absolute left-1/2 top-8 bottom-8 w-0.5 bg-gray-300 transform -translate-x-px overflow-y-auto">
            <div
              className="absolute top-0 left-0 w-full bg-gray-800 transition-all duration-1000 ease-out"
              style={{
                height: `${
                  ((levels.findIndex((l) => getLevelStatus(l) === "current") +
                    1) /
                    levels.length) *
                  100
                }%`,
              }}
            />
          </div>

          {/* Level Nodes */}
          <div className="space-y-8">
            {levels.map((level, index) => {
              const status = getLevelStatus(level);

              return (
                <div
                  key={level.id}
                  className={`flex items-center transition-all duration-500 ${
                    isLoaded
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-8"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center w-full">
                    {index % 2 === 0 && (
                      <div className="flex-1 text-right pr-6">
                        <div className="inline-block text-right">
                          <h3 className="text-lg font-semibold text-gray-800">
                            Level {level.id}
                          </h3>
                        </div>
                      </div>
                    )}

                    <div className="relative z-10">
                      <button
                        onClick={() => handleLevelClick(level)}
                        className={getLevelStyles(status)}
                        disabled={status === "locked"}
                      >
                        {status === "current" ? (
                          <span className="text-xl font-bold">{level.id}</span>
                        ) : (
                          getLevelIcon(status)
                        )}
                        {status === "current" && (
                          <div className="absolute inset-0 rounded-full bg-gray-800 opacity-20 animate-ping" />
                        )}
                      </button>
                    </div>

                    {index % 2 === 1 && (
                      <div className="flex-1 pl-6">
                        <div className="inline-block">
                          <h3 className="text-lg font-semibold text-gray-800">
                            Level {level.id}
                          </h3>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Stats */}
        <div
          className={`mt-12 text-center transition-all duration-1000 delay-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex justify-center gap-8 text-sm text-gray-600">
            <div>
              <span className="font-semibold text-gray-800">
                {lessonProgress.filter((l) => l.completed).length}
              </span>
              <span className="ml-1">Completed</span>
            </div>
            <div>
              <span className="font-semibold text-gray-800">
                {lessonProgress.filter((l) => !l.completed).length}
              </span>
              <span className="ml-1">Remaining</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
