import React from 'react';
import { motion } from 'framer-motion';
interface RiskScoreCardProps {
  score: number;
}
export function RiskScoreCard({ score }: RiskScoreCardProps) {
  // Determine color based on score
  let colorClass = 'text-green-500';
  let bgColorClass = 'bg-green-50';
  let strokeColor = '#22C55E'; // green-500
  if (score < 50) {
    colorClass = 'text-red-500';
    bgColorClass = 'bg-red-50';
    strokeColor = '#EF4444'; // red-500
  } else if (score < 80) {
    colorClass = 'text-amber-500';
    bgColorClass = 'bg-amber-50';
    strokeColor = '#F59E0B'; // amber-500
  }
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - score / 100 * circumference;
  return (
    <div
      className={`flex flex-col items-center justify-center p-4 rounded-2xl ${bgColorClass}`}>
      
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200" />
          
          {/* Progress Circle */}
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            stroke={strokeColor}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{
              strokeDashoffset: circumference
            }}
            animate={{
              strokeDashoffset
            }}
            transition={{
              duration: 1.5,
              ease: 'easeOut'
            }}
            strokeLinecap="round" />
          
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className={`text-2xl font-bold ${colorClass}`}>{score}</span>
          <span className="text-xs text-gray-500 font-medium">/ 100</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-semibold text-gray-700">
        مؤشر الأمان
      </span>
    </div>);

}