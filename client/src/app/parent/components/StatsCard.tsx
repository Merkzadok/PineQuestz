"use client";
import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle?: string;
  color?: "green" | "blue" | "yellow" | "red";
}

export const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  title,
  value,
  subtitle,
  color = "green",
}) => {
  const colorClasses = {
    green: "text-green-600 bg-green-100",
    blue: "text-blue-600 bg-blue-100",
    yellow: "text-yellow-600 bg-yellow-100",
    red: "text-red-600 bg-red-100",
  };
  return (
    <div className="bg-white rounded-xl border p-4 shadow-lg hover:shadow-xl transition-shadow">
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
