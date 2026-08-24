import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiShield, FiCheck, FiX } from 'react-icons/fi';

export const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('lumina_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lumina_cookie_consent', 'all');
    setIsVisible(false);
  };

  const handleEssential = () => {
    localStorage.setItem('lumina_cookie_consent', 'essential');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          aria-label="Cookie consent banner"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-6 inset-x-4 sm:left-auto sm:right-6 sm:max-w-md z-50 glass bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.25)] text-slate-900 dark:text-white"
        >
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 border border-indigo-100 dark:border-indigo-900/50">
              <FiShield className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-serif font-bold text-base mb-1">Your Privacy Matters</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Lumina uses privacy-first cookies strictly for essential navigation, shopping bag persistence, and your preferred currency settings.
              </p>
              <div className="mt-2">
                <Link
                  to="/privacy-policy"
                  className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400 hover:underline uppercase tracking-wider"
                >
                  Read Privacy Policy →
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 mt-5 pt-4 border-t border-slate-100 dark:border-white/10">
            <button
              onClick={handleEssential}
              className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Essential Only
            </button>
            <button
              onClick={handleAccept}
              className="py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-mono font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-md flex items-center justify-center space-x-1"
            >
              <FiCheck className="w-3.5 h-3.5" />
              <span>Accept All</span>
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentBanner;
