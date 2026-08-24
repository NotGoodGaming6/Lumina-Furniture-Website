import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiLoader, FiArrowRight, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '@/redux/api/productApiSlice';

export const SmartSearchAutocomplete = ({ isDarkHeader }) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState([]);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400); 
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { data: searchData, isFetching } = useGetProductsQuery(
    { search: debouncedQuery.trim() },
    { skip: !debouncedQuery.trim() }
  );

  useEffect(() => {
    if (searchData?.data && Array.isArray(searchData.data)) {
      setResults(searchData.data.slice(0, 5)); 
    } else {
      setResults([]);
    }
  }, [searchData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsFocused(false);
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    setDebouncedQuery('');
    setResults([]);

  };

  const showDropdown = isFocused && query.trim().length > 0;

  return (
    <div className="relative z-50 hidden sm:block w-48 md:w-64 lg:w-80 group" ref={containerRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 dark:text-slate-400">
          <FiSearch className="h-[18px] w-[18px]" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search..."
          className="w-full py-2 pl-9 pr-8 text-sm outline-none transition-all rounded-full bg-white dark:bg-slate-900/90 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 border border-slate-200 dark:border-white/10 focus:border-indigo-500 dark:focus:border-indigo-400 shadow-sm"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <FiX className="h-4 w-4" />
          </button>
        )}
      </form>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden text-slate-900 dark:text-white"
          >
            {isFetching && debouncedQuery === query ? (
              <div className="flex items-center justify-center p-6 text-slate-500 dark:text-slate-400">
                <FiLoader className="w-5 h-5 animate-spin mr-2" />
                <span className="text-sm font-medium">Searching...</span>
              </div>
            ) : results.length > 0 ? (
              <div className="flex flex-col max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="px-4 pt-3 pb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Results</span>
                </div>

                {results.map((item) => (
                  <Link
                    key={item._id}
                    to={`/product/${item._id}`}
                    onClick={() => setIsFocused(false)}
                    className="flex items-center px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group/item"
                  >
                    <div className="h-12 w-12 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 border border-slate-200 dark:border-white/10">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="ml-3 flex-grow min-w-0">
                      <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-0.5 truncate">{item.category}</div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white truncate">{item.name}</div>
                    </div>
                    <div className="ml-3 flex-shrink-0 flex items-center text-sm font-bold text-slate-900 dark:text-white">
                      ${item.price.toFixed(2)}
                    </div>
                  </Link>
                ))}

                {searchData?.pagination?.total > 5 && (
                  <button 
                    onClick={handleSubmit}
                    className="flex justify-between items-center w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 text-sm font-bold transition-colors"
                  >
                    View all {searchData.pagination.total} results
                    <FiArrowRight />
                  </button>
                )}
              </div>
            ) : (
              <div className="p-6 text-center">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                  <FiSearch className="h-5 w-5" />
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">No results found</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Try a different search query instead.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
