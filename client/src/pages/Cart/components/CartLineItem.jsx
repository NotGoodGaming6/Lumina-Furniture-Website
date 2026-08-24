import React from 'react';
import { motion } from 'framer-motion';
import { FiMinus, FiPlus, FiTrash2, FiHeart } from 'react-icons/fi';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency } from '@/context/CurrencyContext';

export const CartLineItem = ({ item, updateQuantity, removeFromCart }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col sm:flex-row items-center gap-6 p-6 glass-card rounded-3xl border border-slate-200 dark:border-white/10 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group"
    >
      <div className="w-full sm:w-32 aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 shrink-0 border border-slate-200 dark:border-white/10">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
      </div>

      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate pr-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">{item.name}</h3>
            <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mt-1">{item.category}</p>
          </div>
          <span className="text-lg font-black text-slate-900 dark:text-white">{formatPrice(item.price * item.quantity)}</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
          <div className="flex items-center bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl p-1">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-9 h-9 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <FiMinus />
            </button>
            <span className="w-10 text-center font-bold text-slate-900 dark:text-white">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-9 h-9 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <FiPlus />
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => toggleWishlist(item)}
              className={`p-3 rounded-xl transition-colors border ${
                isInWishlist(item._id || item.id) ? 'bg-rose-500/20 border-rose-500/30 text-rose-400' : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-rose-400'
              }`}
            >
              <FiHeart className={isInWishlist(item._id || item.id) ? 'fill-current' : ''} />
            </button>
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-3 bg-slate-900/60 border border-white/10 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
