import React, { useRef } from 'react';
import { motion } from 'framer-motion';

export const OtpInput = ({ value, onChange }) => {
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const val = e.target.value;
    if (!/^[0-9]*$/.test(val)) return;

    const newOtp = value.split('');
    newOtp[index] = val.slice(-1);
    onChange(newOtp.join(''));

    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    onChange(pasteData.padEnd(6, ' ').slice(0, 6).replace(/ /g, ''));
    const focusIndex = Math.min(pasteData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="flex gap-3 justify-center" onPaste={handlePaste}>
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`w-12 h-14 text-center text-xl font-bold rounded-xl border transition-all outline-none ${
            value[index]
              ? 'bg-brand-500/10 border-brand-500/50 text-white shadow-[0_0_10px_rgba(99,102,241,0.2)]'
              : 'bg-white/5 border-white/10 text-white'
          } focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 focus:bg-white/10`}
        />
      ))}
    </div>
  );
};