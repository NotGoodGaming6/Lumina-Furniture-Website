import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const AuthShell = ({ isLogin, toggleAuth }) => {
  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden selection:bg-brand-500 selection:text-white font-sans flex w-full">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-600/20 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-600/20 blur-[150px]" />
      </div>

      <div className="w-full flex lg:hidden relative z-10 min-h-screen items-center justify-center p-6 sm:p-12 overflow-y-auto pt-24 pb-12">
        <AnimatePresence mode="wait" initial={false}>
          {isLogin ? (
            <motion.div key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="w-full flex justify-center">
              <LoginForm toggleAuth={toggleAuth} />
            </motion.div>
          ) : (
            <motion.div key="register" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full flex justify-center">
              <RegisterForm toggleAuth={toggleAuth} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="hidden lg:block relative w-full h-screen z-10">
        <motion.div
          initial={false}
          className="absolute top-0 left-0 w-1/2 h-full flex items-center justify-center p-24"
          animate={{ opacity: isLogin ? 1 : 0, x: isLogin ? 0 : -50 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ pointerEvents: isLogin ? 'auto' : 'none' }}
        >
          <LoginForm toggleAuth={toggleAuth} />
        </motion.div>

        <motion.div
          initial={false}
          className="absolute top-0 right-0 w-1/2 h-full flex items-center justify-center p-16 overflow-y-auto"
          animate={{ opacity: !isLogin ? 1 : 0, x: !isLogin ? 0 : 50 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ pointerEvents: !isLogin ? 'auto' : 'none' }}
        >
          <RegisterForm toggleAuth={toggleAuth} />
        </motion.div>

        <motion.div
          initial={false}
          className="absolute top-0 left-0 w-1/2 h-full z-20 p-6 shadow-2xl"
          animate={{ x: isLogin ? '100%' : '0%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent z-10" />

            <motion.img
              initial={false}
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
              alt="Login Aesthetic"
              className="absolute inset-0 w-full h-full object-cover"
              animate={{ opacity: isLogin ? 1 : 0, scale: isLogin ? 1 : 1.1 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />

            <motion.img
              initial={false}
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
              alt="Register Aesthetic"
              className="absolute inset-0 w-full h-full object-cover"
              animate={{ opacity: !isLogin ? 1 : 0, scale: !isLogin ? 1 : 1.1 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />

            <div className="absolute top-12 w-full px-12 z-20 flex justify-between items-center">
              <Link to="/" className="text-3xl font-black text-white tracking-tight flex items-center hover:scale-105 transition-transform">
                Lumina<span className="text-brand-500">.</span>
              </Link>
            </div>

            <motion.div
              initial={false}
              className="absolute bottom-12 left-12 right-12 z-20"
              animate={{ opacity: isLogin ? 1 : 0, y: isLogin ? 0 : 20 }}
              transition={{ duration: 0.8 }}
              style={{ pointerEvents: isLogin ? 'auto' : 'none' }}
            >
              <div className="glass-dark p-8 rounded-3xl border border-white/10 backdrop-blur-md">
                <p className="text-xl text-white font-medium italic leading-relaxed mb-4">
                  "Lumina transformed my design process. The aesthetic integration and premium feel is exactly what the modern web needed."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold mr-3">D</div>
                  <div>
                    <h4 className="text-white font-bold text-sm">David Chen</h4>
                    <p className="text-slate-400 text-xs">Chief Design Officer</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={false}
              className="absolute bottom-12 left-12 right-12 z-20"
              animate={{ opacity: !isLogin ? 1 : 0, y: !isLogin ? 0 : 20 }}
              transition={{ duration: 0.8 }}
              style={{ pointerEvents: !isLogin ? 'auto' : 'none' }}
            >
              <div className="glass-dark p-8 rounded-3xl border border-white/10 backdrop-blur-md">
                <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Elevate your living.</h3>
                <p className="text-slate-300 font-medium leading-relaxed">
                  Gain exclusive access to our newest collections, private sales, and personalized interior design consultations. Join the elite.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
