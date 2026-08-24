import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const testimonials = [
  { id: 1, text: "The quality of the lounge chair is simply unparalleled. It completely transformed my reading nook.", author: "Sarah Jenkins", role: "Interior Designer", rating: 5 },
  { id: 2, text: "Minimalist design at its absolute best. The lighting fixtures I ordered arrived in perfect condition.", author: "Michael Chen", role: "Architect", rating: 5 },
  { id: 3, text: "Fast shipping and stunning aesthetics. Lumina has become my go-to store for all home upgrades.", author: "Emma Roberts", role: "Homeowner", rating: 5 },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-brand-800 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-900/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 scroll-animate">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Loved by Designers</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Don't just take our word for it. Here's what professionals are saying about Lumina.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              className={`glass-dark p-8 rounded-3xl scroll-animate delay-${idx * 200}`}
            >
              <div className="flex text-yellow-400 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="fill-current w-5 h-5 mr-1" />
                ))}
              </div>
              <p className="text-lg text-slate-200 mb-8 italic">"{testimonial.text}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-xl font-bold font-sans text-brand-400 mr-4">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white">{testimonial.author}</h4>
                  <p className="text-sm text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
