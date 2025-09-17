"use client";
import React, { useState } from "react";
import { Mascot } from "./components/Mascot";
import { StatsCard } from "./components/StatsCard";
import {
  Zap,
  Trophy,
  Calendar,
  Award,
  Clock,
  Target,
  BookOpen,
  Star,
} from "lucide-react";
import { DailyGoals } from "./components/DailyGoal";

// Type definitions
interface DailyGoal {
  title: string;
  progress: number;
  target: number;
  completed: boolean;
}

interface Activity {
  time: string;
  lesson: string;
  xpEarned: number;
  completed: boolean;
}

const ParentPage: React.FC = () => {
  const [todayStreak, setTodayStreak] = useState<number>(7);
  const [todayXP, setTodayXP] = useState<number>(85);
  const [todayTime, setTodayTime] = useState<number>(23); // minutes
  const [lessonsCompleted, setLessonsCompleted] = useState<number>(2);

  const dailyGoals: DailyGoal[] = [
    { title: "Complete 2 lessons", progress: 2, target: 2, completed: true },
    {
      title: "Study for 20 minutes",
      progress: 23,
      target: 20,
      completed: true,
    },
    { title: "Earn 80 XP", progress: 85, target: 80, completed: true },
  ];

  const todaysActivities: Activity[] = [
    {
      time: "9:15 AM",
      lesson: "Basic Greetings",
      xpEarned: 45,
      completed: true,
    },
    {
      time: "2:30 PM",
      lesson: "Family Members",
      xpEarned: 40,
      completed: true,
    },
    {
      time: "4:45 PM",
      lesson: "Colors & Numbers",
      xpEarned: 0,
      completed: false,
    },
  ];

  const weeklyStats = {
    totalTime: 142, // minutes this week
    totalXP: 520,
    lessonsCompleted: 8,
    averageDaily: 20, // minutes
  };

  const handleGoalClick = (goal: DailyGoal) =>
    console.log("Goal clicked:", goal);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl border p-6 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Mascot mood="happy" size="medium" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Your Child&apos;s Progress Today
              </h1>
              <p className="text-gray-600">
                Track learning activities and achievements
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="font-bold">{todayTime}m</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-green-500" />
              <span className="font-bold">{todayXP} XP</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-500" />
              <span className="font-bold">{lessonsCompleted}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats for Mobile */}
        <div className="grid grid-cols-3 md:hidden gap-4">
          <StatsCard
            icon={Clock}
            title="Time"
            value={`${todayTime}m`}
            color="blue"
          />
          <StatsCard icon={Trophy} title="XP" value={todayXP} color="green" />
          <StatsCard
            icon={BookOpen}
            title="Lessons"
            value={lessonsCompleted}
            color="blue"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Today's Activity & Weekly Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Activities */}
            <div className="bg-white rounded-xl border p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Today's Activities
              </h2>
              <div className="space-y-4">
                {todaysActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          activity.completed ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      ></div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {activity.lesson}
                        </p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold ${
                          activity.completed
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        {activity.completed
                          ? `+${activity.xpEarned} XP`
                          : "In Progress"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.completed ? "Completed" : "Started"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Overview */}
            <div className="bg-white rounded-xl border p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                This Week's Summary
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {weeklyStats.totalTime}m
                  </p>
                  <p className="text-sm text-gray-600">Total Study Time</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {weeklyStats.totalXP}
                  </p>
                  <p className="text-sm text-gray-600">XP Earned</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">
                    {weeklyStats.lessonsCompleted}
                  </p>
                  <p className="text-sm text-gray-600">Lessons Done</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">
                    {weeklyStats.averageDaily}m
                  </p>
                  <p className="text-sm text-gray-600">Daily Average</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Goals & Stats */}
          <div className="space-y-6">
            <DailyGoals goals={dailyGoals} onGoalClick={handleGoalClick} />

            {/* Detailed Stats */}
            <div className="space-y-4">
              <StatsCard
                icon={Zap}
                title="Current Streak"
                value={todayStreak}
                subtitle="days in a row"
                color="yellow"
              />
              <StatsCard
                icon={Target}
                title="Goals Today"
                value="3/3"
                subtitle="All completed!"
                color="green"
              />
              <StatsCard
                icon={Award}
                title="Badges Earned"
                value="2"
                subtitle="This week"
                color="blue"
              />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Parent Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                  View Detailed Report
                </button>
                <button className="w-full p-3 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition-colors">
                  Set Study Reminders
                </button>
                <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-lg font-medium hover:bg-purple-100 transition-colors">
                  Adjust Learning Goals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentPage;
