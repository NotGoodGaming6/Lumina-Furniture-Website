import React from 'react';
import { motion } from 'framer-motion';

const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

export const PasswordStrength = ({ password }) => {
  const strength = getPasswordStrength(password);
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
  const colors = ['', '#ef4444', '#f97316', '#eab308', '#22c55e', '#6366f1'];

  if (!password) return null;

  return (
    <div className="mt-3 space-y-2">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((level) => (
          <motion.div
            key={level}
            className="h-1 flex-1 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: 1,
              backgroundColor: level <= strength ? colors[strength] : 'rgba(255,255,255,0.08)'
            }}
            style={{ transformOrigin: 'left' }}
            transition={{ delay: level * 0.05 }}
          />
        ))}
      </div>
      <p className="text-xs font-bold" style={{ color: colors[strength] }}>
        {labels[strength]}
      </p>
    </div>
  );
};