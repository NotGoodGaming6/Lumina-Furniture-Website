import React from 'react';
import { FiFeather, FiSun, FiDroplet } from 'react-icons/fi';

export const CareGuidePage = () => {
  return (
    <div className="bg-[#fcfbf9] dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 block mb-3">
            MAINTENANCE & LONGEVITY
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-slate-900 dark:text-white mb-6">
            Object Care Guide
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-light">
            Preserve the organic texture, natural patina, and structural integrity of your Lumina handcrafted pieces.
          </p>
        </div>

        <div className="space-y-8">
          <div className="editorial-card rounded-2xl p-8 border border-slate-200 dark:border-white/10">
            <h3 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white mb-4">
              Solid Scandinavian Oak & Walnut
            </h3>
            <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-4">
              Wipe clean using a soft, dry lint-free cloth. Apply natural wood wax once every 6 months to maintain moisture balance. Avoid placement near direct heat sources or radiators.
            </p>
          </div>

          <div className="editorial-card rounded-2xl p-8 border border-slate-200 dark:border-white/10">
            <h3 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white mb-4">
              Natural Linen & Upholstery
            </h3>
            <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-4">
              Vacuum gently using a soft brush attachment. Treat spills immediately by dabbing with an absorbent dry cloth. Professional dry cleaning is recommended for removable cushion covers.
            </p>
          </div>

          <div className="editorial-card rounded-2xl p-8 border border-slate-200 dark:border-white/10">
            <h3 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white mb-4">
              Architectural Ceramics & Glassware
            </h3>
            <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-4">
              Hand wash using lukewarm water and mild biodegradable soap. Avoid abrasive sponges or harsh chemical solvents to preserve matte ceramic glazes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
