import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useProductFilters } from '@/pages/Products/components/useProductFilters';
import { ProductFilterSidebar } from '@/pages/Products/components/ProductFilterSidebar';
import { ProductGrid } from '@/pages/Products/components/ProductGrid';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

export const Products = () => {
  const { 
    products, 
    loading, 
    error, 
    filters, 
    pagination, 
    updateFilters, 
    resetFilters,
    categories 
  } = useProductFilters();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full glass p-8 rounded-[2rem] text-center border border-white/20">
          <p className="text-slate-800 font-bold text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pt-32 pb-24 selection:bg-brand-500 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Breadcrumbs items={[{ label: 'Products' }]} />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight font-display">Our Collection</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">Browse our carefully curated selection of minimalist design pieces.</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest">Sort:</span>
            <select
              value={filters.sort || 'newest'}
              onChange={(e) => updateFilters({ sort: e.target.value })}
              aria-label="Sort products by"
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono font-medium text-slate-900 dark:text-white shadow-xs focus:ring-2 focus:ring-slate-900 dark:focus:ring-white outline-none cursor-pointer min-h-[40px]"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <ProductFilterSidebar 
            categories={categories} 
            filters={filters} 
            updateFilters={updateFilters} 
            resetFilters={resetFilters}
          />

          <div className="flex-grow space-y-12">
            <ProductGrid products={products} loading={loading} />

            {pagination.pages > 1 && (
              <div className="flex items-center justify-center space-x-2 pt-8">
                <button
                  disabled={filters.page === 1}
                  onClick={() => updateFilters({ page: filters.page - 1 })}
                  className="w-12 h-12 rounded-xl flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <FiChevronLeft className="h-6 w-6 transform rotate-0" />
                </button>

                {[...Array(pagination.pages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => updateFilters({ page: i + 1 })}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all ${
                      filters.page === i + 1 ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  disabled={filters.page === pagination.pages}
                  onClick={() => updateFilters({ page: filters.page + 1 })}
                  className="w-12 h-12 rounded-xl flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <FiChevronRight className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
