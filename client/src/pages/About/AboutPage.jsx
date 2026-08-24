import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const team = [
  { name: 'Elena Rostova', role: 'Head of Product Design', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Marcus Chen', role: 'Lead Architect', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Sarah Jenkins', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'David Okafor', role: 'Sustainability Lead', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
];

export const About = () => {
  const { scrollYProgress } = useScroll();
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 400]);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300 selection:bg-brand-500 selection:text-white">

      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white">
        <motion.div 
          style={{ y: yImage }}
          className="absolute inset-0 z-0 h-[120%]"
        >
          <img 
            src="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=80" 
            alt="Lumina Studio" 
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950" />
        </motion.div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 mt-20">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter mb-6 font-display"
          >
            Form.<br/><span className="text-amber-400 dark:text-amber-300 italic font-medium font-serif">Function.</span><br/>Future.
          </motion.h1>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-slate-400 uppercase tracking-widest text-xs font-bold"
        >
          <span>Discover our story</span>
          <div className="w-px h-16 bg-gradient-to-b from-slate-400 to-transparent mt-4"></div>
        </motion.div>
      </section>

      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4">Our Philosophy</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 leading-tight tracking-tight font-display">
              We believe in removing the unnecessary to celebrate the essential.
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Founded in 2026, Lumina aims to redefine modern living by curating and crafting furniture that commands attention through subtlety rather than noise.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Every curve, material, and joint is chosen with intent. We partner with master artisans across the globe—from sustainable oak forests in Scandinavia to glassblowers in Italy—to bring you pieces that are meant to last generations, not seasons.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded-[3rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Craftsmanship" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-[20px] border-white/10 mix-blend-overlay rounded-[3rem] pointer-events-none"></div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white border-y border-white/10 relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="px-6 py-6 md:py-0">
              <h4 className="text-5xl font-black text-indigo-400 mb-4 font-display">100%</h4>
              <p className="text-xl font-bold mb-2">Sustainable Materials</p>
              <p className="text-slate-400 text-sm">Responsibly sourced and certified.</p>
            </div>
            <div className="px-6 py-6 md:py-0">
              <h4 className="text-5xl font-black text-indigo-400 mb-4 font-display">Life</h4>
              <p className="text-xl font-bold mb-2">Lifetime Warranty</p>
              <p className="text-slate-400 text-sm">Built to outlast the trends.</p>
            </div>
            <div className="px-6 py-6 md:py-0">
              <h4 className="text-5xl font-black text-indigo-400 mb-4 font-display">12</h4>
              <p className="text-xl font-bold mb-2">Countries Served</p>
              <p className="text-slate-400 text-sm">Global shipping, local care.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4">The Atelier</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-display">Meet the visionaries behind Lumina.</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-6 bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-white/10">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />

                  <div className="absolute inset-0 bg-indigo-900/10 group-hover:opacity-0 transition-opacity duration-500" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">{member.name}</h4>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
