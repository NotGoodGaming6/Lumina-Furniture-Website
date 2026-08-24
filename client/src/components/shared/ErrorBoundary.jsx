import React from 'react';
import { FiAlertTriangle, FiRefreshCw, FiHome } from 'react-icons/fi';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[CRASH REPORT - React Error Boundary]:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#fcfbf9] dark:bg-slate-950 text-slate-900 dark:text-white flex items-center justify-center p-6 transition-colors duration-300">
          <div className="max-w-lg w-full text-center space-y-6 glass-card p-10 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/50 flex items-center justify-center mx-auto text-amber-500">
              <FiAlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                SYSTEM RECOVERY
              </span>
              <h2 className="text-3xl font-serif font-bold tracking-tight">Something unexpected occurred</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                Our design studio encountered an unexpected state. Your preferences and data remain completely safe.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-mono font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-lg min-h-[44px]"
              >
                <FiRefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>
              <button
                onClick={this.handleHome}
                className="w-full sm:w-auto py-3 px-6 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2 min-h-[44px]"
              >
                <FiHome className="w-4 h-4" />
                <span>Return Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
