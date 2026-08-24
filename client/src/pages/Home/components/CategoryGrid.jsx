import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiChevronRight } from 'react-icons/fi';

const categories = [
  { name: 'Seating', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Lighting', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Decor', image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Tables', image: 'https://images.unsplash.com/photo-1532372576444-dda954194ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

export const CategoryGrid = () => {
  return (
    <section className="py-28 bg-[#fcfbf9] dark:bg-slate-950 transition-colors duration-300 relative border-b border-slate-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-8 border-b border-slate-200 dark:border-white/10 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 block mb-2">
              BROWSE CATEGORIES
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-normal text-slate-900 dark:text-white tracking-tight">
              Shop by Collection
            </h2>
          </div>
          <Link to="/products" className="inline-flex items-center text-slate-900 dark:text-white font-mono text-xs uppercase tracking-[0.2em] hover:text-slate-500 transition-colors group">
            View All Categories <FiArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link to={`/products?category=${category.name}`} key={index} className="group block">
              <div className="relative h-[440px] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-sm transition-all duration-700">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="object-cover w-full h-full filter contrast-[1.02] transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />
                
                <div className="absolute top-6 left-6 font-mono text-xs tracking-widest text-white/80 uppercase">
                  CHAPTER 0{index + 1}
                </div>

                <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                  <div>
                    <h3 className="text-3xl font-serif font-light text-white tracking-wide">{category.name}</h3>
                    <p className="text-xs font-mono tracking-widest text-slate-300 uppercase mt-1">Explore Collection →</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <FiChevronRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
