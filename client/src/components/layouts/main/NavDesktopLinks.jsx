import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const NavDesktopLinks = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'Features', path: '/features' },
    { name: 'About', path: '/about' },
  ];

  return (
    <div className="hidden lg:flex items-center space-x-7 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl px-7 py-2.5 rounded-full border border-slate-200/80 dark:border-white/10 shadow-sm">
      {navLinks.map((link) => {
        const isActive = location.pathname === link.path;

        return (
          <Link
            key={link.path}
            to={link.path}
            className={`text-sm font-bold transition-colors relative group py-0.5 whitespace-nowrap ${
              isActive
                ? 'text-indigo-600 dark:text-indigo-400 font-extrabold'
                : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {link.name}
            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all group-hover:w-full ${isActive ? 'w-full' : ''}`}></span>
          </Link>
        );
      })}
    </div>
  );
};
