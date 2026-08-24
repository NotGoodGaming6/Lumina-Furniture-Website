import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheck, FiCompass, FiDollarSign, FiLayers, FiX } from 'react-icons/fi';
import { useCurrency } from '@/context/CurrencyContext';

export const WelcomeOnboardingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    const hasSeen = localStorage.getItem('lumina_onboarding_seen');
    if (!hasSeen) {
      const timer = setTimeout(() => setIsOpen(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('lumina_onboarding_seen', 'true');
    setIsOpen(false);
  };

  const steps = [
    {
      icon: FiCompass,
      tag: 'CRAFT & PHILOSOPHY',
      title: 'Welcome to Lumina Studio',
      description: 'Handcrafted Scandinavian furniture, organic materials, and architectural lighting engineered with timeless minimalism.',
      actionText: 'Begin Studio Tour'
    },
    {
      icon: FiDollarSign,
      tag: 'MULTI-CURRENCY',
      title: 'Select Your Preferred Currency',
      description: 'Lumina automatically converts all atelier prices with real-time multi-currency support.',
      customBody: (
        <div className="grid grid-cols-3 gap-2.5 my-4">
          {[
            { code: 'USD', symbol: '$', label: 'US Dollar' },
            { code: 'EUR', symbol: '€', label: 'Euro' },
            { code: 'AZN', symbol: '₼', label: 'Manat' },
          ].map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => setCurrency(item.code)}
              className={`p-3 rounded-2xl border text-center transition-all ${
                currency === item.code
                  ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 shadow-sm font-bold'
                  : 'border-slate-200 dark:border-white/10 hover:border-slate-300 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span className="text-lg font-serif block">{item.symbol}</span>
              <span className="text-xs font-mono block uppercase mt-0.5">{item.code}</span>
            </button>
          ))}
        </div>
      ),
      actionText: 'Confirm & Continue'
    },
    {
      icon: FiLayers,
      tag: 'COLLECTIONS',
      title: 'Curated by Domain',
      description: 'Browse architectural Living Room suites, diffused Warm Lighting, and hand-cast ceramic objects for refined spaces.',
      actionText: 'Explore Collections'
    }
  ];

  const current = steps[step];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative w-full max-w-lg glass bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-8 sm:p-10 rounded-[2.5rem] border border-slate-200/80 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.3)] text-slate-900 dark:text-white z-10"
          >
            <button
              onClick={handleClose}
              aria-label="Close onboarding tour"
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
            >
              <FiX className="w-4 h-4" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <current.icon className="w-6 h-6" />
                </div>
                <div className="flex space-x-1.5">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === step ? 'w-6 bg-indigo-600 dark:bg-indigo-400' : 'w-1.5 bg-slate-200 dark:bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 block mb-1">
                  {current.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
                  {current.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed mt-2">
                  {current.description}
                </p>
              </div>

              {current.customBody}

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/10">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    Skip Tour
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (step < steps.length - 1) {
                      setStep(step + 1);
                    } else {
                      handleClose();
                    }
                  }}
                  className="py-3 px-6 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-mono font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center space-x-2 shadow-lg min-h-[44px]"
                >
                  <span>{current.actionText}</span>
                  {step < steps.length - 1 ? <FiArrowRight className="w-4 h-4" /> : <FiCheck className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOnboardingModal;
