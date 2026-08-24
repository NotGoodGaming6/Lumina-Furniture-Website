import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiBox,
  FiShoppingBag,
  FiTag,
  FiUsers,
  FiLogOut,
  FiMenu,
  FiX,
  FiHome,
  FiSun,
  FiMoon
} from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { CurrencyDropdown } from '@/components/shared/CurrencyDropdown';
import { motion } from 'framer-motion';

export const AdminLayout = ({ children, activeTab, setActiveTab }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: FiHome },
    { id: 'inventory', label: 'Inventory', icon: FiBox },
    { id: 'orders', label: 'Orders', icon: FiShoppingBag },
    { id: 'coupons', label: 'Coupons', icon: FiTag },
    { id: 'users', label: 'Users', icon: FiUsers },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-indigo-500 selection:text-white">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900/90 backdrop-blur-xl border-r border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col shadow-xl lg:shadow-none
      `}>
        <div className="h-20 flex items-center px-6 border-b border-slate-200 dark:border-white/10">
          <span className="text-2xl font-serif font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            LUMINA<span className="text-amber-600 dark:text-amber-400 font-serif">.</span>
            <span className="text-[10px] font-mono font-semibold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 tracking-widest border border-slate-200 dark:border-white/10">
              Console
            </span>
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="ml-auto lg:hidden text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 font-medium ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold shadow-lg scale-[1.02]'
                    : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3.5 transition-colors ${
                  isActive 
                    ? 'text-white dark:text-slate-900' 
                    : 'text-slate-400 dark:text-slate-500'
                }`} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-white/10 space-y-2">
          <NavLink
            to="/"
            className="flex items-center px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium"
          >
            <FiHome className="w-5 h-5 mr-3 text-slate-400 dark:text-slate-500" />
            Back to Store
          </NavLink>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors text-sm font-medium"
          >
            <FiLogOut className="w-5 h-5 mr-3 text-rose-500 dark:text-rose-400" />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-6 lg:px-10 z-30 shadow-sm">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
              className="lg:hidden text-slate-400 hover:text-slate-900 dark:hover:text-white mr-4 focus:outline-none"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-serif font-bold text-slate-900 dark:text-white tracking-wide uppercase hidden sm:block">
              {navItems.find(i => i.id === activeTab)?.label || 'Console'}
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            {/* Clean Admin Controls Pill: Currency & Theme */}
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-full border border-slate-200 dark:border-white/10 shadow-sm">
              <CurrencyDropdown />

              <div className="w-[1px] h-4 bg-slate-200 dark:bg-white/10" />

              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                className="relative w-12 h-6 rounded-full p-0.5 bg-slate-200/80 dark:bg-slate-800/80 transition-colors duration-300 flex items-center justify-between cursor-pointer focus-visible:outline-none"
              >
                <FiSun className={`h-3 w-3 z-10 ml-0.5 transition-colors ${theme === 'light' ? 'text-amber-500 font-bold' : 'text-slate-400'}`} />
                <FiMoon className={`h-3 w-3 z-10 mr-0.5 transition-colors ${theme === 'dark' ? 'text-indigo-300 font-bold' : 'text-slate-400'}`} />
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white dark:bg-indigo-600 shadow-sm ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2 border border-slate-200 dark:border-white/10 shadow-sm">
              <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs mr-3 shadow-sm">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-200 hidden sm:block">
                {user?.name || 'Admin'}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
