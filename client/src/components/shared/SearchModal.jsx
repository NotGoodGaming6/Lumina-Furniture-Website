import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiArrowRight, FiLoader } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '@/redux/api/productApiSlice';
import { useCurrency } from '@/context/CurrencyContext';

const popularSearches = ['Lounge Chair', 'Ceramic', 'Lighting', 'Tables', 'Minimalist'];

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  const [results, setResults] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        isOpen ? onClose() : document.dispatchEvent(new CustomEvent('open-search'));
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const { data: searchData, isFetching, error } = useGetProductsQuery(
    { search: debouncedQuery.trim() },
    { skip: !debouncedQuery.trim() }
  );

  useEffect(() => {
    if (searchData?.data && Array.isArray(searchData.data)) {
      setResults(searchData.data.slice(0, 5));
    } else {
      setResults([]);
    }
  }, [searchData, error]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-6 sm:top-[12vh] inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[90vw] sm:max-w-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl shadow-2xl z-[101] overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[75vh] border border-slate-200 dark:border-white/10"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Header / Input */}
            <div className="relative border-b border-slate-200 dark:border-white/10 shrink-0 flex items-center">
              <FiSearch className="absolute left-4 sm:left-6 h-5 w-5 sm:h-6 sm:w-6 text-indigo-500 shrink-0 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent py-4 pl-12 pr-12 sm:py-6 sm:pl-16 sm:pr-16 text-base sm:text-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none font-medium truncate"
              />
              <button 
                onClick={onClose}
                aria-label="Close search dialog"
                className="absolute right-3 sm:right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 p-2 rounded-xl transition-colors focus-visible:outline-none min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                <FiX className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-grow bg-slate-50 dark:bg-slate-950">
              {query === '' ? (
                <div className="p-5 sm:p-8">
                  <h3 className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-3">Popular Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map(term => (
                      <button 
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3 py-2 sm:px-4 sm:py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-slate-900 dark:hover:border-white transition-all shadow-sm focus-visible:outline-none"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-3 sm:p-5">
                  {isFetching && debouncedQuery === query ? (
                    <div className="flex items-center justify-center py-16 text-slate-400">
                      <FiLoader className="h-6 w-6 animate-spin mr-3 text-slate-900 dark:text-white" />
                      <span className="font-medium text-sm">Searching...</span>
                    </div>
                  ) : results.length > 0 ? (
                    <div className="space-y-2">
                      <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 tracking-widest uppercase mb-3 px-2 pt-2">Products ({results.length})</h3>
                      {results.map(item => (
                        <Link 
                          to={`/product/${item._id}`}
                          onClick={onClose}
                          key={item._id}
                          className="flex items-center p-3 sm:p-4 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors border border-slate-100 dark:border-white/5 group focus-visible:outline-none"
                        >
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500'; }}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0" 
                          />
                          <div className="ml-3 sm:ml-4 flex-grow min-w-0 pr-2">
                            <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">{item.category}</span>
                            <h4 className="text-slate-900 dark:text-white font-bold text-sm sm:text-base truncate">{item.name}</h4>
                          </div>
                          <div className="flex items-center text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors shrink-0">
                            <span className="font-bold mr-2 sm:mr-4 text-slate-900 dark:text-white text-sm sm:text-base">{formatPrice(item.price)}</span>
                            <FiArrowRight className="w-4 h-4" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 px-4">
                      <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                        <FiSearch className="h-6 w-6" />
                      </div>
                      <p className="text-slate-900 dark:text-white font-bold text-base mb-1">No results found for "{query}"</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs">Try searching for chairs, tables, or ceramics.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Desktop Keyboard Footer */}
            <div className="hidden sm:flex px-6 py-4 border-t border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-900 justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-medium shrink-0">
              <div className="flex items-center">
                <span>Navigate</span>
                <span className="ml-2 flex space-x-1">
                  <kbd className="bg-white dark:bg-slate-800 border dark:border-white/10 text-center shadow-sm rounded-md px-1.5 py-0.5">↑</kbd>
                  <kbd className="bg-white dark:bg-slate-800 border dark:border-white/10 text-center shadow-sm rounded-md px-1.5 py-0.5">↓</kbd>
                </span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">Close</span>
                <kbd className="bg-white dark:bg-slate-800 border dark:border-white/10 text-center shadow-sm rounded-md px-2 py-0.5">ESC</kbd>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
