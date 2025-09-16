"use client";
import React from "react";
import { Target } from "lucide-react";
import { ProgressCircle } from "./ProgressCircle";

interface DailyGoal {
  title: string;
  progress: number;
  target: number;
  completed: boolean;
}
interface DailyGoalsProps {
  goals: DailyGoal[];
  onGoalClick: (goal: DailyGoal) => void;
}

export const DailyGoals: React.FC<DailyGoalsProps> = ({
  goals,
  onGoalClick,
}) => (
  <div className="bg-white rounded-xl border p-6 shadow-lg">
    <div className="flex items-center gap-2 mb-4">
      <Target className="w-5 h-5 text-green-600" />
      <h3 className="text-lg font-semibold text-gray-800">Өнөөдрийн зорилго</h3>
    </div>
    <div className="space-y-3">
      {goals.map((goal, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
          onClick={() => onGoalClick(goal)}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                goal.completed ? "bg-green-500" : "bg-gray-300"
              }`}
            ></div>
            <div>
              <p className="text-sm font-medium text-gray-800">{goal.title}</p>
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
