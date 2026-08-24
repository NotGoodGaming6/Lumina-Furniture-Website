import React from 'react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { FiAward, FiShield, FiFileText } from 'react-icons/fi';

export const TermsOfServicePage = () => {
  return (
    <div className="bg-[#fcfbf9] dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <Breadcrumbs items={[{ label: 'Terms of Service' }]} />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 block mt-4 mb-2">
            LEGAL AGREEMENT & TERMS
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-slate-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-mono text-xs uppercase">
            Effective Date: January 1, 2026 • Scandinavian Quality Assurance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="editorial-card rounded-2xl p-6 border border-slate-200 dark:border-white/10">
            <FiAward className="w-6 h-6 text-indigo-500 mb-3" />
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-1">Authentic Materials</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed">100% sustainably harvested solid Scandinavian oak, natural linen, and hand-cast ceramics.</p>
          </div>
          <div className="editorial-card rounded-2xl p-6 border border-slate-200 dark:border-white/10">
            <FiShield className="w-6 h-6 text-emerald-500 mb-3" />
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-1">5-Year Warranty</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed">Comprehensive structural frame warranty on all solid wood designs.</p>
          </div>
          <div className="editorial-card rounded-2xl p-6 border border-slate-200 dark:border-white/10">
            <FiFileText className="w-6 h-6 text-amber-500 mb-3" />
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-1">Transparent Pricing</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed">Zero hidden fees or surprise charges at checkout with transparent multi-currency display.</p>
          </div>
        </div>

        <div className="editorial-card rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-white/10 space-y-8 font-light text-slate-600 dark:text-slate-400 leading-relaxed">
          <section>
            <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and purchasing through Lumina Studio, you agree to be bound by these Terms of Service and all applicable international trade and consumer protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white mb-3">
              2. Intellectual Property & Original Design
            </h2>
            <p>
              All furniture designs, brand names, visual assets, 3D renderings, and catalog photography on Lumina are proprietary intellectual property. Unauthorized commercial reproduction is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white mb-3">
              3. Natural Material Variations
            </h2>
            <p>
              Because our pieces are handcrafted from organic timber and natural glazes, subtle variances in grain patterns, knot placements, and tones are genuine signs of bespoke craftsmanship.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white mb-3">
              4. Governing Law
            </h2>
            <p>
              These terms are governed by and construed in accordance with Scandinavian commercial law and EU consumer directives.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
