"use client";
import React, { useState } from "react";
import {
  Play,
  Trophy,
  Target,
  Calendar,
  Star,
  Lock,
  CheckCircle,
  Zap,
  Heart,
  BookOpen,
  Award,
  TrendingUp,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

// Type Definitions
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

interface MascotProps {
  mood?: "happy" | "excited" | "sleepy";
  size?: "small" | "medium" | "large";
}

interface ProgressCircleProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
}

interface RoadmapNodeProps {
  lesson: Lesson;
  isActive: boolean;
  isCompleted: boolean;
  isLocked: boolean;
  onClick: () => void;
}

interface ProgressRoadmapProps {
  lessons: Lesson[];
  currentLesson: number;
  onLessonSelect: (lesson: Lesson) => void;
}

interface DailyGoalsProps {
  goals: DailyGoal[];
  onGoalClick: (goal: DailyGoal) => void;
}

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle?: string;
  color?: "green" | "blue" | "yellow" | "red";
}

interface ContinueButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

interface ColorClasses {
  green: string;
  blue: string;
  yellow: string;
  red: string;
}

interface SizeClasses {
  small: string;
  medium: string;
  large: string;
}

interface AnimationClasses {
  happy: string;
  excited: string;
  sleepy: string;
}

// Mascot Component
const Mascot: React.FC<MascotProps> = ({ mood = "happy", size = "large" }) => {
  const sizeClasses: SizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-32 h-32",
  };

  const animations: AnimationClasses = {
    happy: "animate-bounce",
    excited: "animate-pulse",
    sleepy: "animate-pulse opacity-70",
  };

  return (
    <div
      className={`${sizeClasses[size]} ${animations[mood]} transition-all duration-500`}
    >
      <div className="relative w-full h-full">
        {/* Mascot body */}
        <div className="absolute inset-0 bg-green-500 rounded-full shadow-lg">
          {/* Eyes */}
          <div className="absolute top-6 left-4 w-3 h-3 bg-black rounded-full"></div>
          <div className="absolute top-6 right-4 w-3 h-3 bg-black rounded-full"></div>

          {/* Mouth */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-6 h-3 border-b-2 border-black rounded-full"></div>

          {/* Cheeks */}
          <div className="absolute top-10 left-1 w-4 h-2 bg-green-400 rounded-full opacity-60"></div>
          <div className="absolute top-10 right-1 w-4 h-2 bg-green-400 rounded-full opacity-60"></div>
        </div>

        {/* Arms */}
        <div className="absolute -left-2 top-12 w-4 h-8 bg-green-500 rounded-full transform rotate-12"></div>
        <div className="absolute -right-2 top-12 w-4 h-8 bg-green-500 rounded-full transform -rotate-12"></div>
      </div>
    </div>
  );
};

// Progress Circle Component
const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress,
  size = 60,
  strokeWidth = 6,
}) => {
  const radius: number = (size - strokeWidth) / 2;
  const circumference: number = radius * 2 * Math.PI;
  const strokeDasharray: string = `${circumference} ${circumference}`;
  const strokeDashoffset: number =
    circumference - (progress / 100) * circumference;

  return (
    <div className="relative">
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgb(229 231 235)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgb(34 197 94)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-gray-800">{progress}%</span>
      </div>
    </div>
  );
};

// Roadmap Node Component
const RoadmapNode: React.FC<RoadmapNodeProps> = ({
  lesson,
  isActive,
  isCompleted,
  isLocked,
  onClick,
}) => {
  const getNodeStyle = (): string => {
    if (isCompleted) return "bg-green-500 text-white border-green-500";
    if (isActive)
      return "bg-white text-gray-800 border-green-500 ring-2 ring-green-200";
    if (isLocked) return "bg-gray-200 text-gray-400 border-gray-300";
    return "bg-white text-gray-600 border-gray-300 hover:border-green-400";
  };

  const getIcon = () => {
    if (isCompleted) return <CheckCircle className="w-5 h-5" />;
    if (isLocked) return <Lock className="w-5 h-5" />;
    return <BookOpen className="w-5 h-5" />;
  };

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`
        relative p-4 rounded-full border-2 shadow-lg transform transition-all duration-200
        ${getNodeStyle()}
        ${!isLocked ? "hover:scale-105 active:scale-95" : "cursor-not-allowed"}
        ${isActive ? "animate-pulse" : ""}
      `}
    >
      {getIcon()}

      {/* Lesson number */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <span className="text-xs font-medium text-gray-600">{lesson.id}</span>
      </div>

      {/* Stars for completed lessons */}
      {isCompleted && lesson.stars && (
        <div className="absolute -top-2 -right-2 flex">
          {Array.from({ length: lesson.stars }).map((_, i) => (
            <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
          ))}
        </div>
      )}
    </button>
  );
};

// Progress Roadmap Component
const ProgressRoadmap: React.FC<ProgressRoadmapProps> = ({
  lessons,
  currentLesson,
  onLessonSelect,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-800">Таны явц</h3>
      </div>

      <div className="relative">
        {/* Roadmap path */}
        <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-1 bg-gray-200 rounded-full"></div>

        <div className="space-y-8">
          {lessons.map((lesson: Lesson, index: number) => (
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

// Daily Goals Component
const DailyGoals: React.FC<DailyGoalsProps> = ({ goals, onGoalClick }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-800">
          Өнөөдрийн зорилго
        </h3>
      </div>

      <div className="space-y-3">
        {goals.map((goal: DailyGoal, index: number) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => onGoalClick(goal)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  goal.completed ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {goal.title}
                </p>
                <p className="text-xs text-gray-500">
                  {goal.progress}/{goal.target}
                </p>
              </div>
            </div>
            <ProgressCircle
              progress={(goal.progress / goal.target) * 100}
              size={40}
              strokeWidth={4}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  title,
  value,
  subtitle,
  color = "green",
}) => {
  const colorClasses: ColorClasses = {
    green: "text-green-600 bg-green-100",
    blue: "text-blue-600 bg-blue-100",
    yellow: "text-yellow-600 bg-yellow-100",
    red: "text-red-600 bg-red-100",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

// Continue Button Component
const ContinueButton: React.FC<ContinueButtonProps> = ({
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg
        transform transition-all duration-200
        ${
          disabled
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-green-500 text-white shadow-lg hover:bg-green-600 hover:scale-105 active:scale-95 hover:shadow-xl"
        }
      `}
    >
      <Play className="w-6 h-6" />
      {disabled ? "Completed for today!" : "Үргэлжлүүлэх"}
    </button>
  );
};

// Main App Component
const KidsLearningApp: React.FC = () => {
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

  const handleLessonSelect = (lesson: Lesson): void => {
    if (lesson.id <= currentLesson) {
      console.log("Starting lesson:", lesson.id);
    }
  };

  const handleContinue = (): void => {
    console.log("Continue to lesson:", currentLesson);
  };

  const handleGoalClick = (goal: DailyGoal): void => {
    console.log("Goal clicked:", goal);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with Mascot */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Mascot mood="happy" size="medium" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Сайн байна уу!
                </h1>
                <p className="text-gray-600">Өнөөдөр суралцахад бэлэн үү?</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-gray-800">{streak}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-green-500" />
                <span className="font-bold text-gray-800">{totalXP}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-current" />
                <span className="font-bold text-gray-800">{hearts}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Mobile View */}
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

          {/* Right Column - Goals & Actions */}
          <div className="space-y-6">
            {/* Daily Goals */}
            <DailyGoals goals={dailyGoals} onGoalClick={handleGoalClick} />

            {/* Continue Button */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
              <ContinueButton onClick={handleContinue} />

              {/* Next lesson preview */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Дараагийн хичээл:</p>
                <p className="font-medium text-gray-800">
                  {lessons.find((l: Lesson) => l.id === currentLesson)?.title ||
                    "Animals"}
                </p>
              </div>
            </div>

            {/* Additional Stats */}
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

export default KidsLearningApp;
