import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    quote: "The tactile warmth of the solid oiled oak and the quiet proportions create an undeniable sense of sanctuary in modern urban residences.",
    author: "Astrid Lindholm",
    role: "Principal Architect, Studio Lindholm",
    city: "Stockholm"
  },
  {
    id: 2,
    quote: "Lumina achieves what so few modern brands manage: architectural rigor and geometric purity without ever sacrificing physical comfort.",
    author: "Jonas Møller",
    role: "Interior Director, Atelier Form",
    city: "Copenhagen"
  },
  {
    id: 3,
    quote: "Every piece feels grounded, substantial, and intentional. This is furniture designed to age with dignity across decades, not seasons.",
    author: "Freja Vanger",
    role: "Spatial Curator, Nord Habitat",
    city: "Oslo"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 block mb-3 font-medium">
            ARCHITECTURAL VOICES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-slate-900 dark:text-white tracking-tight">
            Designed for Considered Spaces
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="p-8 sm:p-10 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300"
            >
              <p className="font-serif text-lg text-slate-800 dark:text-slate-200 leading-relaxed italic mb-8">
                "{item.quote}"
              </p>
              <div className="pt-6 border-t border-slate-200/60 dark:border-white/5">
                <div className="font-sans font-medium text-slate-900 dark:text-white text-sm">
                  {item.author}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {item.role} — <span className="font-mono text-[11px] text-amber-700 dark:text-amber-500 font-medium">{item.city}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
