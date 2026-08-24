import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingBag, FiStar, FiCheck, FiTruck, FiShield, FiPlus, FiMinus } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useNavigate } from 'react-router-dom';

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleViewFullDetails = () => {
    onClose();
    navigate(`/products/${product._id}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`quick-view-title-${product._id}`}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 selection:bg-slate-900 selection:text-white"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 flex flex-col md:flex-row z-10 max-h-[90vh]"
          >
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="w-full md:w-1/2 bg-slate-100 dark:bg-slate-800/50 relative overflow-hidden flex items-center justify-center p-6 md:p-8 min-h-[280px] md:min-h-[420px]">
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'; }}
                className="w-full h-full object-cover rounded-2xl shadow-sm hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10">
                {product.category || 'Atelier'}
              </span>
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center space-x-2 text-amber-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 ml-1">
                    (4.9 Studio Reviews)
                  </span>
                </div>

                <h2
                  id={`quick-view-title-${product._id}`}
                  className="font-serif font-bold text-2xl md:text-3xl text-slate-900 dark:text-white leading-tight"
                >
                  {product.name}
                </h2>

                <div className="flex items-baseline space-x-3 mt-3">
                  <span className="font-serif font-bold text-2xl text-slate-900 dark:text-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm font-sans line-through text-slate-400">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className={`text-xs font-mono px-2.5 py-1 rounded-full ${
                    (product.stock ?? 10) > 0
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'
                  }`}>
                    {(product.stock ?? 10) > 0 ? `In Stock (${product.stock ?? 10})` : 'Out of Stock'}
                  </span>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm font-sans leading-relaxed mt-4 line-clamp-3">
                  {product.description || 'Handcrafted solid Scandinavian oak piece designed for minimalist warmth, durability, and timeless living spaces.'}
                </p>

                <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center space-x-2">
                    <FiTruck className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>White-Glove Shipping</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiShield className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>30-Day Residence Trial</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-medium">
                    Quantity
                  </span>

                  <div className="flex items-center space-x-3 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-white/10">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      disabled={qty <= 1}
                      aria-label="Decrease quantity"
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-40 transition-colors"
                    >
                      <FiMinus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-mono font-bold text-sm text-slate-900 dark:text-white">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(Math.min(product.stock ?? 99, qty + 1))}
                      disabled={qty >= (product.stock ?? 99)}
                      aria-label="Increase quantity"
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-40 transition-colors"
                    >
                      <FiPlus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3.5 px-6 rounded-2xl font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 min-h-[44px] ${
                      added
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100'
                    }`}
                  >
                    {added ? (
                      <>
                        <FiCheck className="w-4 h-4" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <FiShoppingBag className="w-4 h-4" />
                        <span>Add to Cart • {formatPrice((product.price ?? 0) * qty)}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleViewFullDetails}
                    aria-label="View full details page"
                    className="px-4 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-2xl font-medium text-sm transition-colors border border-slate-200 dark:border-white/10 min-h-[44px] whitespace-nowrap"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
