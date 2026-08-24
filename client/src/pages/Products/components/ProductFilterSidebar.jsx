import React from 'react';
import { FiFilter, FiCheck, FiStar, FiRefreshCw } from 'react-icons/fi';

export const ProductFilterSidebar = ({ categories, filters, updateFilters, resetFilters }) => {
  return (
    <div className="lg:w-80 flex-shrink-0">
      <div className="sticky top-28 space-y-10">
        
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-6">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-[0.2em] flex items-center">
            <FiFilter className="mr-2" /> Filters
          </h3>
          <button 
            onClick={resetFilters}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors flex items-center group"
          >
            <FiRefreshCw className="mr-1.5 group-hover:rotate-180 transition-transform duration-500" /> Clear All
          </button>
        </div>

        <section>
          <h4 className="text-sm font-black text-slate-900 dark:text-white mb-5 font-display">Category</h4>
          <div className="flex flex-col space-y-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => updateFilters({ category: cat })}
                className={`text-left px-4 py-2.5 rounded-2xl transition-all duration-300 flex items-center justify-between group ${
                  filters.category === cat 
                    ? 'btn-gradient font-bold shadow-lg shadow-indigo-500/25 translate-x-2' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className="font-medium">{cat}</span>
                {filters.category === cat && <FiCheck className="w-4 h-4 text-white" />}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h4 className="text-sm font-black text-slate-900 dark:text-white mb-5 font-display">Price Range</h4>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
              <input 
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => updateFilters({ minPrice: e.target.value })}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl py-3 pl-8 pr-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 placeholder-slate-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none shadow-sm"
              />
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
              <input 
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => updateFilters({ maxPrice: e.target.value })}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl py-3 pl-8 pr-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 placeholder-slate-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none shadow-sm"
              />
            </div>
          </div>
        </section>

        <section>
          <label className="flex items-center justify-between cursor-pointer group">
            <div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white font-display">In Stock Only</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Hide unavailable items</p>
            </div>
            <div className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={filters.inStock}
                onChange={(e) => updateFilters({ inStock: e.target.checked })}
              />
              <div className="w-11 h-6 bg-slate-200 dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </div>
          </label>
        </section>

      </div>
    </div>
  );
};
