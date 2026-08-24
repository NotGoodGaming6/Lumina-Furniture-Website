import React from 'react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { FiLock, FiEye, FiCheckCircle, FiShield } from 'react-icons/fi';

export const PrivacyPolicyPage = () => {
  return (
    <div className="bg-[#fcfbf9] dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 block mt-4 mb-2">
            PRIVACY & DATA GOVERNANCE
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-slate-900 dark:text-white mb-4">
            Privacy & Cookie Policy
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-mono text-xs uppercase">
            Effective Date: January 1, 2026 • GDPR & CCPA Compliant
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="editorial-card rounded-2xl p-6 border border-slate-200 dark:border-white/10">
            <FiLock className="w-6 h-6 text-indigo-500 mb-3" />
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-1">Data Minimization</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed">We strictly collect only the essential data required to deliver your orders.</p>
          </div>
          <div className="editorial-card rounded-2xl p-6 border border-slate-200 dark:border-white/10">
            <FiShield className="w-6 h-6 text-emerald-500 mb-3" />
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-1">Encrypted Security</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed">Passwords and authentication tokens are salted and encrypted with bcrypt & JWT.</p>
          </div>
          <div className="editorial-card rounded-2xl p-6 border border-slate-200 dark:border-white/10">
            <FiCheckCircle className="w-6 h-6 text-amber-500 mb-3" />
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-1">No Data Selling</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed">We never sell, lease, or monetize your personal information to third parties.</p>
          </div>
        </div>

        <div className="editorial-card rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-white/10 space-y-8 font-light text-slate-600 dark:text-slate-400 leading-relaxed">
          <section>
            <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white mb-3">
              1. What Information We Collect
            </h2>
            <p>
              We collect information you explicitly provide when creating an account, browsing collections, or placing an order:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li><strong>Contact & Identity:</strong> Full name, email address.</li>
              <li><strong>Shipping Logistics:</strong> Street address, city, postal code, and country for furniture delivery.</li>
              <li><strong>Authentication:</strong> Encrypted password hashes (raw passwords are never stored or accessible).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white mb-3">
              2. Cookies & Local Storage
            </h2>
            <p>
              Lumina uses minimal, privacy-first cookies and browser local storage strictly for essential website functionality:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li><strong>Authentication Token:</strong> To keep you securely logged in across sessions.</li>
              <li><strong>Preferences:</strong> To remember your selected currency ($ USD, € EUR, ₼ AZN) and color theme (Light/Dark).</li>
              <li><strong>Shopping Bag:</strong> To persist your cart items while you browse our catalog.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white mb-3">
              3. Data Protection Rights (GDPR & CCPA)
            </h2>
            <p>
              You hold complete sovereignty over your data. You may request a copy of your stored records or permanent account erasure at any time by emailing privacy@lumina.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white mb-3">
              4. Third-Party Payment Processing
            </h2>
            <p>
              Payment transactions are processed through certified, PCI-DSS Level 1 compliant financial gateways. Lumina never stores or has access to full credit card or debit card numbers on its servers.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
