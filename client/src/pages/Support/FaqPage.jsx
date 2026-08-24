import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';

const faqs = [
  {
    question: "What materials do you use in your furniture?",
    answer: "We craft our pieces using sustainably harvested Scandinavian solid oak, natural linen, architectural ceramics, and non-toxic matte finishes. Every piece is built to last for generations."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard orders ship within 3–5 business days. Custom crafted pieces require 2–4 weeks. Express white-glove delivery is available worldwide."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day complimentary trial for all catalog items. If a piece does not suit your space, our white-glove logistics team will collect it free of charge."
  },
  {
    question: "Do you offer warranty on Lumina objects?",
    answer: "All Lumina furniture items come with a 5-year structural warranty covering craftsmanship, joints, and wood integrity."
  },
  {
    question: "Can I customize the finish or upholstery?",
    answer: "Yes, our Copenhagen studio provides bespoke wood stains, leather grades, and textile options for architectural projects and private residences."
  }
];

export const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#fcfbf9] dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 block mb-3">
            SUPPORT & KNOWLEDGE BASE
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-slate-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-light">
            Everything you need to know about our Scandinavian design studio, ordering, delivery, and craftsmanship.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="editorial-card rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  className="w-full p-6 text-left flex justify-between items-center space-x-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-white"
                >
                  <span className="text-xl font-serif font-semibold text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <FiChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-slate-600 dark:text-slate-400 font-light leading-relaxed border-t border-slate-100 dark:border-white/5 pt-4"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
