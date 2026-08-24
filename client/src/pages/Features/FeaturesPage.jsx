import React from 'react';
import { FiMonitor, FiFeather, FiShield, FiTruck, FiHeart, FiSettings } from 'react-icons/fi';

export const FeaturesPage = () => {
  const features = [
    { title: "Premium Materials", icon: <FiFeather className="w-8 h-8"/>, desc: "We source only the highest quality materials for maximum durability and comfort." },
    { title: "Modern Design", icon: <FiMonitor className="w-8 h-8"/>, desc: "Sleek, minimalist aesthetics crafted to elevate any contemporary living space." },
    { title: "Built to Last", icon: <FiShield className="w-8 h-8"/>, desc: "Rigorous quality control ensures every piece provides a lifetime of usage." },
    { title: "Fast Delivery", icon: <FiTruck className="w-8 h-8"/>, desc: "Expedited shipping network ensures your items arrive safely and swiftly." },
    { title: "Customer Care", icon: <FiHeart className="w-8 h-8"/>, desc: "Dedicated support team ready to assist with your interior design journey." },
    { title: "Customizable", icon: <FiSettings className="w-8 h-8"/>, desc: "Personalize components and finishes to perfectly match your unique style." },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen py-32 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center scroll-animate">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6 font-display">
          Why Choose <span className="text-indigo-600 dark:text-indigo-400 font-serif italic">Lumina?</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-16">
          Discover the unique features and uncompromising standards that make our furniture the centerpiece of modern homes globally.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {

          const colIndex = index % 3;
          const delayClass = colIndex === 1 ? 'delay-100' : (colIndex === 2 ? 'delay-200' : '');

          return (
            <div 
              key={index}
              className={`glass-card rounded-3xl p-8 border border-slate-200 dark:border-white/10 shadow-md hover:shadow-2xl transition-all scroll-animate ${delayClass}`}
            >
              <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 font-display">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          );
        })}
      </div>

      <div className="max-w-5xl mx-auto mt-32 glass-card rounded-[3rem] p-12 md:p-20 text-center border border-slate-200 dark:border-white/10 shadow-2xl scroll-animate">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 font-display">Experience the Difference</h2>
        <p className="text-slate-600 dark:text-slate-300 text-lg mb-10 max-w-xl mx-auto">
          Ready to transform your living space? Browse our curated collection and find your next favorite piece.
        </p>
        <button className="btn-gradient text-white font-bold py-4 px-10 rounded-xl shadow-xl inline-block">
          Explore Collection
        </button>
      </div>
    </div>
  );
};
