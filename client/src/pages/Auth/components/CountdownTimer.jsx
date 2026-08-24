import React from 'react';
import { motion } from 'framer-motion';

export const CountdownTimer = ({ seconds }) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const progress = (seconds / 120) * 100;

  return (
    <div className="flex flex-col items-center gap-3 mt-6">
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke={seconds > 30 ? '#6366f1' : seconds > 10 ? '#f59e0b' : '#ef4444'}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={175.9}
            animate={{ strokeDashoffset: 175.9 - (progress / 100) * 175.9 }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-sm font-bold tabular-nums ${
            seconds > 30 ? 'text-white' : seconds > 10 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {mins}:{secs.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      <p className="text-xs text-slate-500 font-medium">
        {seconds > 0 ? 'Code expires in' : 'Code has expired'}
      </p>
    </div>
  );
};