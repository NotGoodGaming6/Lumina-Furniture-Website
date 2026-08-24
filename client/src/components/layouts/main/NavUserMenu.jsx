import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiLogOut, FiSettings, FiPackage } from 'react-icons/fi';

export const NavUserMenu = ({ user, logout }) => {
  if (!user) return null;

  return (
    <div className="relative group text-sm font-bold flex items-center cursor-pointer">
      <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center font-sans shadow-md border-2 border-white/20 transition-transform group-hover:scale-110">
        {user.name.charAt(0).toUpperCase()}
      </div>

      <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-56 z-[60]">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col p-1 text-slate-900 dark:text-white">
          <div className="px-4 py-3 border-b border-slate-200 dark:border-white/10 mb-1">
            <p className="text-xs text-slate-400 dark:text-slate-400 font-medium uppercase tracking-wider">Account</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
          </div>

          {user.role === 'admin' && (
            <Link
              to="/admin"
              className="px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl flex items-center space-x-3 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <FiSettings className="h-4 w-4" />
              </div>
              <span>Admin Dashboard</span>
            </Link>
          )}

          <Link
            to="/profile"
            className="px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl flex items-center space-x-3 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <FiUser className="h-4 w-4" />
            </div>
            <span>My Profile</span>
          </Link>

          <Link
            to="/orders"
            className="px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl flex items-center space-x-3 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <FiPackage className="h-4 w-4" />
            </div>
            <span>Order History</span>
          </Link>

          <button
            onClick={logout}
            className="px-4 py-2.5 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded-xl flex items-center space-x-3 transition-colors mt-1 w-full text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
              <FiLogOut className="h-4 w-4 text-rose-500" />
            </div>
            <span className="font-bold">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
