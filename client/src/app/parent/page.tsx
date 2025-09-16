"use client";
import React, { useState } from "react";
import { Mascot } from "./components/Mascot";
import { StatsCard } from "./components/StatsCard";
import { ProgressRoadmap } from "./components/ProgressRoadMap";
import { Zap, Trophy, Heart, Calendar, Award, TrendingUp } from "lucide-react";
import { DailyGoals } from "./components/DailyGoal";
import { ContinueButton } from "./components/Continue";

// Type definitions (simplified for the page)
interface Lesson {
  id: number;
  title: string;
  stars?: number;
}
interface DailyGoal {
  title: string;
  progress: number;
  target: number;
  completed: boolean;
}

const ParentPage: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState<number>(3);
  const [streak, setStreak] = useState<number>(7);
  const [totalXP, setTotalXP] = useState<number>(1250);
  const [hearts, setHearts] = useState<number>(5);

  const lessons: Lesson[] = [
    { id: 1, title: "Basic Greetings", stars: 3 },
    { id: 2, title: "Family Members", stars: 2 },
    { id: 3, title: "Colors & Numbers", stars: 1 },
    { id: 4, title: "Animals" },
    { id: 5, title: "Food & Drinks" },
    { id: 6, title: "Weather" },
    { id: 7, title: "Time & Days" },
    { id: 8, title: "Transportation" },
  ];

  const dailyGoals: DailyGoal[] = [
    { title: "Complete 1 lesson", progress: 0, target: 1, completed: false },
    { title: "Earn 50 XP", progress: 25, target: 50, completed: false },
    {
      title: "Practice for 15 minutes",
      progress: 8,
      target: 15,
      completed: false,
    },
  ];

  const handleLessonSelect = (lesson: Lesson) => {
    if (lesson.id <= currentLesson) console.log("Starting lesson:", lesson.id);
  };

  const handleGoalClick = (goal: DailyGoal) =>
    console.log("Goal clicked:", goal);
  const handleContinue = () =>
    console.log("Continue to lesson:", currentLesson);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with Mascot and Quick Stats */}
        <div className="bg-white rounded-xl border p-6 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Mascot mood="happy" size="medium" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Сайн байна уу!
              </h1>
              <p className="text-gray-600">Өнөөдөр суралцахад бэлэн үү?</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="font-bold">{streak}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-green-500" />
              <span className="font-bold">{totalXP}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="font-bold">{hearts}</span>
            </div>
          </div>
        </div>

        {/* Stats Cards for Mobile */}
        <div className="grid grid-cols-3 md:hidden gap-4">
          <StatsCard icon={Zap} title="Streak" value={streak} color="yellow" />
          <StatsCard icon={Trophy} title="XP" value={totalXP} color="green" />
          <StatsCard icon={Heart} title="Hearts" value={hearts} color="red" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Roadmap */}
          <div className="lg:col-span-2">
            <ProgressRoadmap
              lessons={lessons}
              currentLesson={currentLesson}
              onLessonSelect={handleLessonSelect}
            />
          </div>

          {/* Right Column - Goals & Continue */}
          <div className="space-y-6">
            <DailyGoals goals={dailyGoals} onGoalClick={handleGoalClick} />

            <div className="bg-white rounded-xl border p-6 shadow-lg">
              <ContinueButton onClick={handleContinue} />
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Дараагийн хичээл:</p>
                <p className="font-medium text-gray-800">
                  {lessons.find((l) => l.id === currentLesson)?.title ||
                    "Animals"}
                </p>
              </div>
            </div>

            {/* Additional Stats for Large Screens */}
            <div className="hidden lg:grid grid-cols-1 gap-4">
              <StatsCard
                icon={Calendar}
                title="Today's Time"
                value="15m"
                subtitle="Goal: 15 minutes"
                color="blue"
              />
              <StatsCard
                icon={Award}
                title="Achievements"
                value="12"
                subtitle="3 new this week"
                color="yellow"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentPage;
