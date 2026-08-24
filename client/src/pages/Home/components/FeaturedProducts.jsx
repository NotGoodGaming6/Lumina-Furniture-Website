import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiStar, FiEye, FiLayers } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCompare } from '@/context/CompareContext';
import { useCurrency } from '@/context/CurrencyContext';
import { QuickViewModal } from '@/components/shared/QuickViewModal';

export const FeaturedProducts = ({ products }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toggleCompare, isInCompare } = useCompare();
  const { formatPrice } = useCurrency();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-slate-400 uppercase block mb-3">
              COPENHAGEN COLLECTION
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
              Featured Designs
            </h2>
          </div>
          <Link
            to="/products"
            className="mt-6 md:mt-0 text-sm font-mono font-bold tracking-widest text-slate-900 dark:text-white hover:text-slate-600 dark:hover:text-slate-300 transition-colors uppercase border-b-2 border-slate-900 dark:border-white pb-1 inline-block"
          >
            Explore All Catalog →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {products.slice(0, 3).map((product, idx) => (
            <div key={product._id || idx} className="group relative">
              <div className="editorial-card rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full">
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'; }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  <div className="absolute top-4 right-4 flex items-center space-x-1.5 z-10">
                    <button
                      onClick={() => toggleCompare(product)}
                      title={isInCompare(product._id) ? "Remove from Compare" : "Compare Specifications"}
                      aria-label={isInCompare(product._id) ? `Remove ${product.name} from compare` : `Compare ${product.name}`}
                      className={`w-9 h-9 rounded-full backdrop-blur-md border border-slate-200 dark:border-white/10 flex items-center justify-center transition-colors shadow-sm min-h-[36px] min-w-[36px] ${
                        isInCompare(product._id)
                          ? 'bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950 font-bold'
                          : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-amber-500'
                      }`}
                    >
                      <FiLayers className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setQuickViewProduct(product)}
                      aria-label={`Quick view ${product.name}`}
                      className="w-9 h-9 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors min-h-[36px] min-w-[36px]"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => toggleWishlist(product)}
                      aria-label="Add to wishlist"
                      className="w-9 h-9 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-rose-500 flex items-center justify-center transition-colors min-h-[36px] min-w-[36px]"
                    >
                      <FiHeart className={`w-4 h-4 ${isInWishlist(product._id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-mono text-xs uppercase font-bold tracking-wider rounded-2xl shadow-xl hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                    >
                      <FiShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between border-t border-slate-200/80 dark:border-white/10">
                  <Link to={`/products/${product._id}`}>
                    <span className="text-[10px] font-mono tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase block mb-1">
                      {product?.category ?? 'Furniture'}
                    </span>
                    <h3 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white mb-2 truncate group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                      {product?.name ?? 'Lumina Item'}
                    </h3>
                  </Link>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                    <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">IN STOCK</span>
                    <span className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                      {formatPrice(product?.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};
