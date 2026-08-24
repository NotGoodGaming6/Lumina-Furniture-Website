import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiTrash2, FiArrowRight } from 'react-icons/fi';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { cartToast } from '@/utils/alerts';

export const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, loading } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    if (addToCart(product)) {
      removeFromWishlist(product._id);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-slate-50 dark:bg-slate-950 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-12 pt-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2 font-display">My Wishlist</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Items you've saved for later.</p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center border border-slate-200 dark:border-white/10 shadow-xl w-full max-w-2xl mx-auto mt-10">
             <div className="w-24 h-24 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiHeart className="h-10 w-10 text-rose-500" />
             </div>
             <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 font-display">Your wishlist is empty</h3>
             <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">Found something you like? Tap on the heart icon next to the item to add it to your wishlist.</p>
             <Link to="/products" className="inline-flex px-8 py-4 btn-gradient text-white font-bold rounded-xl transition-all items-center mx-auto group shadow-lg">
               Discover Products
               <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {wishlistItems.map((product) => (
                <motion.div 
                  key={product._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="glass-card rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group border border-slate-200 dark:border-white/10 flex flex-col"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => removeFromWishlist(product._id)}
                        className="w-10 h-10 rounded-full glass shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-rose-500 transition-colors"
                        title="Remove from wishlist"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-slate-950/80 to-transparent">
                      <button 
                         onClick={() => handleMoveToCart(product)}
                         className="w-full btn-gradient py-3 text-white font-bold rounded-xl flex items-center justify-center shadow-lg"
                      >
                        <FiShoppingBag className="mr-2 h-4 w-4" /> Move to Cart
                      </button>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                     <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold tracking-widest uppercase mb-1">
                      {product.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">{product.name}</h3>
                    <div className="mt-auto pt-3 flex items-end justify-between">
                       <span className="text-lg font-black text-slate-900 dark:text-white">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
};
