import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiShield, FiLock, FiCheck } from 'react-icons/fi';

export const Stepper = ({ currentStep }) => {
  const steps = [
    { label: 'Details', icon: FiUser },
    { label: 'Verify', icon: FiShield },
    { label: 'Password', icon: FiLock }
  ];

  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((step, index) => {
        const StepIcon = step.icon;
        const isActive = index === currentStep;
        const isComplete = index < currentStep;

        return (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center">
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isComplete ? '#6366f1' : isActive ? '#6366f1' : 'rgba(255,255,255,0.05)'
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                  isComplete || isActive
                    ? 'border-brand-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                    : 'border-white/10'
                }`}
              >
                {isComplete ? (
                  <FiCheck className="w-5 h-5 text-white" />
                ) : (
                  <StepIcon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                )}
              </motion.div>
              <span className={`text-xs mt-2 font-bold ${
                isComplete || isActive ? 'text-brand-400' : 'text-slate-600'
              }`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-px mx-2 mb-5 transition-all ${
                index < currentStep ? 'bg-brand-500' : 'bg-white/10'
              }`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};