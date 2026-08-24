import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight } from 'react-icons/fi';

export const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 flex-wrap">
        <li>
          <Link
            to="/"
            className="flex items-center hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Home"
          >
            <FiHome className="w-3.5 h-3.5 mr-1 text-slate-400 dark:text-slate-500" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center space-x-2">
              <FiChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 shrink-0" />
              {isLast || !item.url ? (
                <span className="font-bold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-[300px]">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.url}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors truncate max-w-[150px]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
