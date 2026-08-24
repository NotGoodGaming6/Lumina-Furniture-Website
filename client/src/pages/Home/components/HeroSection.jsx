import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar } from 'react-icons/fi';

import heroBanner from '@/assets/hero_banner.png';

const textContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const textItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } }
};

export const HeroSection = ({ scrollYProgress, y }) => {
  const realHeroImage = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-[#fcfbf9] dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-white/10 transition-colors duration-300">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="flex justify-between items-center pb-6 mb-10 border-b border-slate-200 dark:border-white/10 text-xs font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase">
          <span>SPRING / SUMMER 2026</span>
          <span className="hidden sm:inline">COPENHAGEN & STOCKHOLM STUDIO</span>
          <span>FREE SHIPPING OVER $150</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <motion.div variants={textContainer} initial="hidden" animate="show" className="lg:col-span-7">
            
            <motion.div variants={textItem} className="inline-flex items-center space-x-3 mb-6">
              <span className="h-px w-8 bg-slate-900 dark:bg-white inline-block"></span>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
                SCANDINAVIAN INTERIOR DESIGN
              </span>
            </motion.div>

            <motion.h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight text-slate-900 dark:text-white leading-[1.02] mb-8">
              <motion.div variants={textItem}>Minimalist design</motion.div>
              <motion.div variants={textItem}>for contemporary</motion.div>
              <motion.div variants={textItem}>living spaces.</motion.div>
            </motion.h1>

            <motion.p variants={textItem} className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-sans max-w-xl font-light">
              Crafted from sustainable solid oak, natural linen, and architectural ceramics to bring warmth and functional elegance to your home.
            </motion.p>

            <motion.div variants={textItem} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link 
                to="/products" 
                className="inline-flex items-center justify-center px-10 py-5 text-xs font-mono font-bold tracking-widest uppercase bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full shadow-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-all duration-300 group"
              >
                Browse Collection
                <FiArrowRight className="ml-3 h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link 
                to="/categories" 
                className="inline-flex items-center justify-center px-10 py-5 text-xs font-mono font-bold tracking-widest uppercase text-slate-900 dark:text-white border border-slate-300 dark:border-white/20 hover:border-slate-900 dark:hover:border-white transition-all duration-300 rounded-full"
              >
                View Categories
              </Link>
            </motion.div>

            <motion.div variants={textItem} className="mt-16 grid grid-cols-3 gap-8 pt-8 border-t border-slate-200 dark:border-white/10">
              <div>
                <h4 className="text-3xl font-serif font-light text-slate-900 dark:text-white">100%</h4>
                <p className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-2">Solid Oak</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif font-light text-slate-900 dark:text-white">5 Years</h4>
                <p className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-2">Warranty</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif font-light text-slate-900 dark:text-white">Express</h4>
                <p className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-2">Delivery</p>
              </div>
            </motion.div>

          </motion.div>

          <motion.div style={{ y }} className="lg:col-span-5 relative hidden lg:block h-[620px] w-full">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10">
              <motion.img
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                src={realHeroImage}
                alt="Minimalist Living Space"
                className="w-full h-full object-cover filter brightness-[1.02] contrast-[1.02]"
              />

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.6 }} 
                className="absolute bottom-6 left-6 right-6 glass p-5 rounded-xl border border-slate-200 dark:border-white/10 shadow-xl flex items-center justify-between"
              >
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">FEATURED PRODUCT</p>
                  <p className="text-base font-serif font-bold text-slate-900 dark:text-white mt-0.5">The Minimalist Velvet Lounge Chair</p>
                </div>
                <Link to="/products" className="w-9 h-9 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-mono text-xs font-bold hover:scale-110 transition-transform">
                  →
                </Link>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
