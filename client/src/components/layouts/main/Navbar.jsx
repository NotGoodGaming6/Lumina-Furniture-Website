import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch, FiHeart, FiSun, FiMoon } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { useTheme } from '@/context/ThemeContext';
import { useCurrency } from '@/context/CurrencyContext';
import { CurrencyDropdown } from '@/components/shared/CurrencyDropdown';
import { motion } from 'framer-motion';
import { SearchModal } from '@/components/shared/SearchModal';
import { NavDesktopLinks } from '@/components/layouts/main/NavDesktopLinks';
import { NavUserMenu } from '@/components/layouts/main/NavUserMenu';
import { NavMobileMenu } from '@/components/layouts/main/NavMobileMenu';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { currency, setCurrency } = useCurrency();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const handleOpenSearch = () => setIsSearchOpen(true);
    document.addEventListener('open-search', handleOpenSearch);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('open-search', handleOpenSearch);
    };
  }, []);

  const isHome = location.pathname === '/';
  const navTheme = scrolled 
    ? 'glass py-3 shadow-xl' 
    : (isHome ? 'bg-transparent py-4 sm:py-5' : 'glass py-3.5 sm:py-4');

  const actionIconClass = "w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 relative min-h-[44px] min-w-[44px]";

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navTheme}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            <Link to="/" className="flex-shrink-0 flex items-center group mr-2 sm:mr-4">
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-xl sm:text-2xl md:text-3xl font-serif font-bold tracking-tight text-slate-900 dark:text-white"
              >
                LUMINA<span className="text-amber-600 dark:text-amber-400 font-serif">.</span>
              </motion.span>
            </Link>

            <div className="hidden lg:flex items-center justify-center flex-1 mx-6">
              <NavDesktopLinks />
            </div>

            <div className="flex items-center space-x-1 sm:space-x-3">
              
              <button 
                onClick={() => setIsSearchOpen(true)} 
                aria-label="Open search"
                title="Search Products"
                className={actionIconClass}
              >
                <FiSearch className="h-5 w-5" />
              </button>

              <div className="hidden sm:flex items-center space-x-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-full border border-slate-200/80 dark:border-white/10 shadow-sm">
                <CurrencyDropdown />

                <div className="w-[1px] h-3.5 bg-slate-300 dark:bg-white/10" />

                <button
                  onClick={toggleTheme}
                  aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                  className="relative w-10 h-5 rounded-full p-0.5 bg-slate-200 dark:bg-slate-700 transition-colors duration-300 flex items-center justify-between cursor-pointer focus-visible:outline-none"
                >
                  <FiSun className={`h-2.5 w-2.5 z-10 ml-0.5 transition-colors ${theme === 'light' ? 'text-amber-500 font-bold' : 'text-slate-400'}`} />
                  <FiMoon className={`h-2.5 w-2.5 z-10 mr-0.5 transition-colors ${theme === 'dark' ? 'text-indigo-300 font-bold' : 'text-slate-400'}`} />
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white dark:bg-indigo-500 shadow-sm ${
                      theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {user ? (
                <div className="hidden sm:block">
                  <NavUserMenu user={user} logout={logout} />
                </div>
              ) : (
                <Link 
                  to="/login" 
                  aria-label="Sign in to your account"
                  title="Sign In"
                  className={`${actionIconClass} hidden sm:flex`}
                >
                  <FiUser className="h-5 w-5" />
                </Link>
              )}

              <Link 
                to="/wishlist" 
                aria-label={`View Wishlist, ${wishlistItems.length} items`}
                title="Wishlist"
                className={`${actionIconClass} hidden sm:flex`}
              >
                <FiHeart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} key={wishlistItems.length} className="absolute top-1.5 right-1.5 bg-rose-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-md">
                    {wishlistItems.length}
                  </motion.span>
                )}
              </Link>

              <Link 
                to="/cart" 
                aria-label={`View Shopping Cart, ${totalItems} items`}
                title="Shopping Bag"
                className={actionIconClass}
              >
                <FiShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} key={totalItems} className="absolute top-1.5 right-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-md">
                    {totalItems}
                  </motion.span>
                )}
              </Link>

              <button 
                className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px]" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
              </button>

            </div>
          </div>
        </div>

        <NavMobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      </nav>
    </>
  );
};

export default Navbar;