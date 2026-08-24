import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FiUser, FiSun, FiMoon, FiHeart } from 'react-icons/fi';
import { useCurrency } from '@/context/CurrencyContext';
import { useTheme } from '@/context/ThemeContext';
import { useWishlist } from '@/context/WishlistContext';
import { CurrencyDropdown } from '@/components/shared/CurrencyDropdown';

export const NavMobileMenu = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { currency, setCurrency } = useCurrency();
  const { theme, toggleTheme } = useTheme();
  const { wishlistItems } = useWishlist();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'Features', path: '/features' },
    { name: 'About', path: '/about' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden absolute top-full left-0 w-full glass mt-1 border-t border-slate-200 dark:border-white/20 overflow-hidden shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl"
        >
          <div className="px-4 py-5 space-y-3">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-base font-bold transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-200 dark:border-white/10">
              <Link 
                to="/wishlist" 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <FiHeart className="w-4 h-4 text-rose-500" />
                  <span>Wishlist</span>
                </div>
                {wishlistItems.length > 0 && (
                  <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <Link 
                to="/profile" 
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                <FiUser className="w-4 h-4 text-indigo-500" />
                <span>Account Profile</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-200/80 dark:border-white/10">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400">Theme</span>
                <button
                  onClick={toggleTheme}
                  aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                  className="relative w-11 h-6 rounded-full p-0.5 bg-slate-200 dark:bg-slate-700 transition-colors duration-300 flex items-center justify-between cursor-pointer focus-visible:outline-none"
                >
                  <FiSun className={`h-3 w-3 z-10 ml-0.5 transition-colors ${theme === 'light' ? 'text-amber-500 font-bold' : 'text-slate-400'}`} />
                  <FiMoon className={`h-3 w-3 z-10 mr-0.5 transition-colors ${theme === 'dark' ? 'text-indigo-300 font-bold' : 'text-slate-400'}`} />
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white dark:bg-indigo-500 shadow-sm ${
                      theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-white/10">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400">Currency</span>
                <CurrencyDropdown dropUp={true} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
