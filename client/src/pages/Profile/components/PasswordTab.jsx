import React from 'react';
import { FiLock, FiCheck } from 'react-icons/fi';

export const PasswordTab = ({ passwordData, handlePasswordChange, handleUpdatePassword, loading }) => {
  return (
    <form onSubmit={handleUpdatePassword} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-lg mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 font-bold focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all outline-none"
              placeholder="Enter current password"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">New Password</label>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 font-bold focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all outline-none"
              placeholder="Enter new password"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-brand-500 text-white font-bold rounded-2xl hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/20 disabled:opacity-50 flex items-center justify-center space-x-2"
      >
        <FiCheck />
        <span>{loading ? 'Updating...' : 'Update Password'}</span>
      </button>
    </form>
  );
};
