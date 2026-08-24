import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight, FiGithub } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '@/context/AuthContext';
import { ForgotPasswordModal } from '@/components/shared/ForgotPasswordModal';

export const LoginForm = ({ toggleAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loggedInUser = await login(email, password);
    if (loggedInUser) {
      if (loggedInUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <>
      <div className="w-full max-w-md">
        <div className="mb-10 lg:hidden text-center">
          <Link to="/" className="text-3xl font-black text-white tracking-tight flex justify-center items-center">
            Lumina<span className="text-brand-500">.</span>
          </Link>
        </div>

        <h1 className="text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight">Welcome back</h1>
        <p className="text-slate-400 text-lg mb-10">Sign in to your account to continue.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 group">
            <label className="text-sm font-bold text-slate-300 ml-1 transition-colors group-focus-within:text-brand-400">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-slate-500 group-focus-within:text-brand-400 transition-colors" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 focus:bg-white/10 transition-all font-sans"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="space-y-2 group">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-bold text-slate-300 transition-colors group-focus-within:text-brand-400">Password</label>
              <button
                type="button"
                onClick={() => setIsForgotOpen(true)}
                className="text-xs font-bold text-brand-400 hover:text-brand-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-slate-500 group-focus-within:text-brand-400 transition-colors" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 focus:bg-white/10 transition-all font-sans"
                placeholder="••••••••"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center justify-center group min-h-[44px]"
          >
            Sign In
            <FiArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </form>

        <div className="mt-10 relative hidden sm:block">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-slate-900 text-slate-500 font-medium">Or continue with</span>
          </div>
        </div>

        <div className="mt-8 hidden sm:grid grid-cols-2 gap-4">
          <button type="button" className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl py-3 px-4 transition-all text-white font-medium hover:-translate-y-1 min-h-[44px]">
            <FcGoogle className="h-5 w-5" />
            <span>Google</span>
          </button>
          <button type="button" className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl py-3 px-4 transition-all text-white font-medium hover:-translate-y-1 min-h-[44px]">
            <FiGithub className="h-5 w-5 text-slate-300" />
            <span>GitHub</span>
          </button>
        </div>

        <p className="mt-10 text-center text-slate-400">
          Don't have an account?{' '}
          <button onClick={toggleAuth} className="font-bold text-brand-400 hover:text-brand-300 transition-colors">
            Create one now
          </button>
        </p>
      </div>

      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
      />
    </>
  );
};
