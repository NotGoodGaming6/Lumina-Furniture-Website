import React from 'react';
import { motion } from 'framer-motion';

export const TiltCard = ({ children, className = '' }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full h-full transition-shadow duration-300 hover:shadow-xl rounded-[inherit] ${className}`}
    >
      {children}
    </motion.div>
  );
};
