import React from 'react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { FiRefreshCw, FiTruck, FiCheckCircle, FiShield } from 'react-icons/fi';

export const RefundPolicyPage = () => {
  return (
    <div className="bg-[#fcfbf9] dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <Breadcrumbs items={[{ label: 'Refund & Returns Policy' }]} />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 block mt-4 mb-2">
            CONSUMER PROTECTION & SATISFACTION
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-slate-900 dark:text-white mb-4">
            Refund & Cancellation Policy
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-mono text-xs uppercase">
            Effective Date: January 1, 2026 • 30-Day Residence Trial Guarantee
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="editorial-card rounded-2xl p-6 border border-slate-200 dark:border-white/10">
            <FiRefreshCw className="w-6 h-6 text-indigo-500 mb-3" />
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-1">30-Day Trial</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed">Experience your furniture in your home for 30 full days risk-free.</p>
          </div>
          <div className="editorial-card rounded-2xl p-6 border border-slate-200 dark:border-white/10">
            <FiTruck className="w-6 h-6 text-amber-500 mb-3" />
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-1">White-Glove Pickup</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed">Our logistics team will package and retrieve items directly from your room.</p>
          </div>
          <div className="editorial-card rounded-2xl p-6 border border-slate-200 dark:border-white/10">
            <FiCheckCircle className="w-6 h-6 text-emerald-500 mb-3" />
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-1">100% Full Refund</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed">Full payment returned to your original payment method within 3-5 business days.</p>
          </div>
        </div>

        <div className="editorial-card rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-white/10 space-y-8 font-light text-slate-600 dark:text-slate-400 leading-relaxed">
          <section>
            <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white mb-3">
              1. 30-Day Residence Trial
            </h2>
            <p>
              We want you to love your Lumina furniture pieces. If for any reason a piece does not suit your space, you may initiate a return within 30 days of physical delivery. Items must be in original condition with no structural damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white mb-3">
              2. Order Cancellation
            </h2>
            <p>
              You can cancel your order free of charge at any time prior to item dispatch from our Copenhagen or Stockholm atelier. Once dispatched, standard return procedures apply.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white mb-3">
              3. Refund Processing
            </h2>
            <p>
              Once your returned item is received and inspected at our warehouse, your refund will be processed immediately. Credit card and bank refunds typically reflect within 3 to 5 business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white mb-3">
              4. Damaged or Defective Items
            </h2>
            <p>
              In the rare event that an item arrives with transit damage or manufacturing imperfections, please notify us within 48 hours at support@lumina.com. We will arrange an immediate complimentary replacement or a full refund.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
