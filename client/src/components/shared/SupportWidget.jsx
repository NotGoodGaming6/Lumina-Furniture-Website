import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHelpCircle, FiX, FiMail, FiMessageCircle, FiPackage, FiShield, FiArrowRight } from 'react-icons/fi';

export const SupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Customer Support Concierge"
          className="w-12 h-12 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.25)] border border-white/20 transition-all min-h-[44px] min-w-[44px]"
        >
          {isOpen ? <FiX className="w-5 h-5" /> : <FiHelpCircle className="w-5 h-5" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-22 left-6 z-50 w-80 sm:w-96 glass bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-slate-900 dark:text-white"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center space-x-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h4 className="font-serif font-bold text-base">Studio Concierge</h4>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Online</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 font-light leading-relaxed">
              How may our architectural team assist your living space today?
            </p>

            <div className="space-y-2.5 mt-4">
              <Link
                to="/orders"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-white/5 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <FiPackage className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-medium">Track Active Order</span>
                </div>
                <FiArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/faq"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-white/5 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <FiHelpCircle className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-medium">Shipping & Return FAQs</span>
                </div>
                <FiArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-white/5 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <FiMail className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-medium">Email Interior Concierge</span>
                </div>
                <FiArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SupportWidget;
