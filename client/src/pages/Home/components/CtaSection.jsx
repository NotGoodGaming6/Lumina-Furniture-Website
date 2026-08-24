import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const CtaSection = () => {
  return (
    <section className="py-28 bg-[#fcfbf9] dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="editorial-card rounded-3xl p-12 md:p-20 text-center relative overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl"
        >
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 block mb-4">
            STAY INSPIRED
          </span>

          <h2 className="text-4xl md:text-5xl font-serif font-normal text-slate-900 dark:text-white mb-6 relative z-10">
            Join the Lumina Community
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-light mb-10 max-w-2xl mx-auto relative z-10 font-sans">
            Subscribe to receive 10% off your first order, interior guides, and early access to new collection releases.
          </p>
          <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto gap-3 relative z-10">
            <input 
              type="email" 
              placeholder="Enter your email address..."
              className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-6 py-4 rounded-full border border-slate-200 dark:border-white/10 outline-none text-sm font-sans flex-1"
            />
            <button
              className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest font-bold shadow-lg hover:opacity-90 transition-all"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
