import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const TiltCard = ({ children, className = '' }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const xPct = mouseX / width;
    const yPct = mouseY / height;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {

    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: '1200px' }} className={`w-full h-full ${className}`}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full rounded-[inherit] transition-colors duration-300"
      >

        <motion.div
          style={{
            transform: 'translateZ(-50px)',
            opacity: useTransform(x, [-0.5, 0.5], [0.1, 0.4]),
          }}
          className="absolute inset-0 bg-slate-900/10 rounded-[inherit] blur-2xl pointer-events-none"
        />

        <div 
          style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
          className="w-full h-full rounded-[inherit] relative z-10"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};
