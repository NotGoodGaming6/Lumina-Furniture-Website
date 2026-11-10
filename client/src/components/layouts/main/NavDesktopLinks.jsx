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
    <div className="hidden lg:flex items-center space-x-7 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-7 py-2.5 rounded-full border border-slate-200/80 dark:border-white/10 shadow-sm">
      {navLinks.map((link) => {
        const isActive = location.pathname === link.path;

        return (
          <Link
            key={link.path}
            to={link.path}
            className={`text-sm transition-colors relative group py-0.5 whitespace-nowrap ${
              isActive
                ? 'text-slate-900 dark:text-white font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-normal'
            }`}
          >
            {link.name}
            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300 group-hover:w-full ${isActive ? 'w-full' : ''}`}></span>
          </Link>
        );
      })}
    </div>
  );
};
