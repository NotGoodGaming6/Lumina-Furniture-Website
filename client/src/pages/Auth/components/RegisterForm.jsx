import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiArrowRight, FiCheck, FiShield, FiRefreshCw } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useRegisterInitMutation, useVerifyOtpMutation, useRegisterCompleteMutation, useResendOtpMutation } from '@/redux/api/userApiSlice';
import { setCredentials } from '@/redux/slices/authSlice';
import { successAlert, errorAlert } from '@/utils/alerts';
import { Stepper } from './Stepper';
import { OtpInput } from './OtpInput';
import { CountdownTimer } from './CountdownTimer';
import { PasswordStrength } from './PasswordStrength';

export const RegisterForm = ({ toggleAuth }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [step, setStep] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(120);
  const [isExpired, setIsExpired] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [registerInit, { isLoading: initLoading }] = useRegisterInitMutation();
  const [verifyOtpMutation, { isLoading: verifyLoading }] = useVerifyOtpMutation();
  const [registerComplete, { isLoading: completeLoading }] = useRegisterCompleteMutation();
  const [resendOtp, { isLoading: resendLoading }] = useResendOtpMutation();

  useEffect(() => {
    if (step !== 1) return;

    setIsExpired(false);
    setCountdown(120);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step, sessionId]);

  const handleStep1 = async (e) => {
    e.preventDefault();
    try {
      const result = await registerInit({ name, email }).unwrap();
      setSessionId(result.sessionId);
      setStep(1);
    } catch (err) {
      errorAlert('Error', err.data?.error || 'Failed to start registration');
    }
  };

  const handleStep2 = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      errorAlert('Invalid', 'Please enter all 6 digits');
      return;
    }
    try {
      await verifyOtpMutation({ sessionId, otp }).unwrap();
      setStep(2);
    } catch (err) {
      errorAlert('Verification Failed', err.data?.error || 'Invalid code');
    }
  };

  const handleStep3 = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      errorAlert('Mismatch', 'Passwords do not match');
      return;
    }
    if (password.length < 6) {
      errorAlert('Too Short', 'Password must be at least 6 characters');
      return;
    }
    try {
      const result = await registerComplete({ sessionId, password }).unwrap();
      dispatch(setCredentials({ 
        user: result.user, 
        token: result.token,
        refreshToken: result.refreshToken
      }));
      successAlert('Welcome!', 'Account created successfully!');
      navigate('/');
    } catch (err) {
      errorAlert('Registration Failed', err.data?.error || 'Could not complete registration');
    }
  };

  const handleResend = async () => {
    try {
      const result = await resendOtp({ sessionId }).unwrap();
      setSessionId(result.sessionId);
      setOtp('');
      setCountdown(120);
      setIsExpired(false);
      successAlert('Sent!', 'A new code has been sent to your email');
    } catch (err) {
      errorAlert('Error', err.data?.error || 'Failed to resend code');
    }
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction > 0 ? -60 : 60, opacity: 0 })
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-10 lg:hidden text-center">
        <Link to="/" className="text-3xl font-black text-white tracking-tight flex justify-center items-center">
          Lumina<span className="text-brand-500">.</span>
        </Link>
      </div>

      <Stepper currentStep={step} />

      <AnimatePresence mode="wait" custom={step}>
        {step === 0 && (
          <motion.div key="step-0" custom={1} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
            <h1 className="text-3xl lg:text-4xl font-black text-white mb-2 tracking-tight">Create an account</h1>
            <p className="text-slate-400 mb-8">Join our exclusive community of design enthusiasts.</p>

            <form onSubmit={handleStep1} className="space-y-5">
              <div className="space-y-2 group">
                <label className="text-sm font-bold text-slate-300 ml-1 transition-colors group-focus-within:text-brand-400">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-slate-500 group-focus-within:text-brand-400 transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 focus:bg-white/10 transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

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
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 focus:bg-white/10 transition-all"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={initLoading}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center justify-center group mt-2 disabled:opacity-50"
              >
                {initLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Continue <FiArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="step-1" custom={1} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-5">
                <FiShield className="w-7 h-7 text-brand-400" />
              </div>
              <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Verify your email</h1>
              <p className="text-slate-400 text-sm mb-2">We sent a 6-digit code to</p>
              <p className="text-brand-400 font-bold text-sm mb-6">{email}</p>
            </div>

            <form onSubmit={handleStep2} className="space-y-6">
              <OtpInput value={otp} onChange={setOtp} />

              <CountdownTimer seconds={countdown} />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={verifyLoading || otp.length !== 6}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] flex items-center justify-center disabled:opacity-50"
              >
                {verifyLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Verify Code <FiCheck className="ml-2 w-5 h-5" /></>
                )}
              </motion.button>

              <div className="text-center">
                {isExpired ? (
                  <motion.button
                    type="button"
                    onClick={handleResend}
                    disabled={resendLoading}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-brand-400 hover:text-brand-300 font-bold text-sm flex items-center justify-center mx-auto gap-2 transition-colors"
                  >
                    {resendLoading ? (
                      <div className="w-4 h-4 border-2 border-brand-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <FiRefreshCw className="w-4 h-4" /> Resend Code
                      </>
                    )}
                  </motion.button>
                ) : (
                  <p className="text-slate-600 text-xs">Didn't receive? Wait for the timer to resend.</p>
                )}
              </div>
            </form>

            <button
              onClick={() => { setStep(0); setOtp(''); }}
              className="mt-6 text-slate-500 hover:text-slate-300 text-sm font-medium transition-colors block mx-auto"
            >
              ← Change email
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step-2" custom={1} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
                <FiCheck className="w-7 h-7 text-green-400" />
              </div>
              <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Set your password</h1>
              <p className="text-slate-400 text-sm">Email verified! Now create a secure password.</p>
            </div>

            <form onSubmit={handleStep3} className="space-y-5">
              <div className="space-y-2 group">
                <label className="text-sm font-bold text-slate-300 ml-1 transition-colors group-focus-within:text-brand-400">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-slate-500 group-focus-within:text-brand-400 transition-colors" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 focus:bg-white/10 transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <PasswordStrength password={password} />
              </div>

              <div className="space-y-2 group">
                <label className="text-sm font-bold text-slate-300 ml-1 transition-colors group-focus-within:text-brand-400">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-slate-500 group-focus-within:text-brand-400 transition-colors" />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className={`w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 focus:bg-white/10 transition-all ${
                      confirmPassword && confirmPassword !== password
                        ? 'border-red-500/50'
                        : confirmPassword && confirmPassword === password
                        ? 'border-green-500/50'
                        : 'border-white/10'
                    }`}
                    placeholder="••••••••"
                  />
                </div>
                {confirmPassword && confirmPassword !== password && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs font-bold ml-1">
                    Passwords don't match
                  </motion.p>
                )}
                {confirmPassword && confirmPassword === password && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-green-400 text-xs font-bold ml-1 flex items-center gap-1">
                    <FiCheck className="w-3 h-3" /> Passwords match
                  </motion.p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={completeLoading || password !== confirmPassword || password.length < 6}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center justify-center group mt-2 disabled:opacity-50"
              >
                {completeLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account <FiArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {step === 0 && (
        <p className="mt-8 text-center text-slate-400">
          Already have an account?{' '}
          <button onClick={toggleAuth} className="font-bold text-brand-400 hover:text-brand-300 transition-colors">
            Sign in
          </button>
        </p>
      )}
    </div>
  );
};
