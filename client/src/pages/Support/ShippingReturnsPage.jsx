import React from 'react';
import { FiTruck, FiRotateCcw, FiShield, FiGlobe } from 'react-icons/fi';

export const ShippingReturnsPage = () => {
  return (
    <div className="bg-[#fcfbf9] dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 block mb-3">
            LOGISTICS & POLICIES
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-slate-900 dark:text-white mb-6">
            Shipping & Complimentary Returns
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-light">
            We handle every piece with white-glove precision from our Scandinavian logistics studio directly to your residence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="editorial-card rounded-2xl p-8 border border-slate-200 dark:border-white/10">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center justify-center mb-6">
              <FiTruck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white mb-3">
              White-Glove Delivery
            </h3>
            <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              Our specialized logistics partners uncrate, inspect, assemble, and position your furniture in your room of choice, removing all packaging materials.
            </p>
          </div>

          <div className="editorial-card rounded-2xl p-8 border border-slate-200 dark:border-white/10">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center justify-center mb-6">
              <FiRotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white mb-3">
              30-Day Residence Trial
            </h3>
            <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              Experience your items in your space. If a design does not harmonize with your interior, arrange a complimentary return within 30 days.
            </p>
          </div>
        </div>

        <div className="editorial-card rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-white/10 space-y-6">
          <h2 className="text-3xl font-serif font-normal text-slate-900 dark:text-white">
            International Delivery Rates
          </h2>
          <div className="space-y-4 text-slate-600 dark:text-slate-400 font-light">
            <div className="flex justify-between py-3 border-b border-slate-200 dark:border-white/10">
              <span className="font-medium text-slate-900 dark:text-white">Scandinavian Region (DK, SE, NO, FI)</span>
              <span className="font-mono text-xs">Complimentary Over $150</span>
            </div>
            <div className="flex justify-between py-3 border-b border-slate-200 dark:border-white/10">
              <span className="font-medium text-slate-900 dark:text-white">European Union & UK</span>
              <span className="font-mono text-xs">$45 (Express White-Glove)</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="font-medium text-slate-900 dark:text-white">Worldwide Shipping</span>
              <span className="font-mono text-xs">$95 (Global Freight)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
