import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiStar, FiEye, FiLayers } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCompare } from '@/context/CompareContext';
import { useCurrency } from '@/context/CurrencyContext';
import { TiltCard } from '@/components/shared/TiltCard';
import { QuickViewModal } from '@/components/shared/QuickViewModal';

import { ProductCardSkeleton } from '@/components/shared/SkeletonLoader';

export const ProductGrid = ({ products, loading }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toggleCompare, isInCompare } = useCompare();
  const { formatPrice } = useCurrency();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 glass rounded-[3rem] border border-dashed border-white/10">
        <p className="text-slate-400 text-lg font-medium">No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="h-full"
          >
            <TiltCard className="group relative flex flex-col glass-card rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 pointer-events-auto h-full">
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-slate-900">
                {product.tag && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full shadow-md">
                      {product.tag}
                    </span>
                  </div>
                )}

                <div className="absolute top-4 right-4 z-20 flex items-center space-x-1.5">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleCompare(product);
                    }}
                    title={isInCompare(product._id) ? "Remove from Compare" : "Compare Specifications"}
                    aria-label={isInCompare(product._id) ? `Remove ${product.name} from compare` : `Compare ${product.name}`}
                    className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-colors shadow-sm min-h-[36px] min-w-[36px] ${
                      isInCompare(product._id)
                        ? 'bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950 font-bold'
                        : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-amber-500'
                    }`}
                  >
                    <FiLayers className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setQuickViewProduct(product);
                    }}
                    title="Quick View"
                    aria-label={`Quick view ${product.name}`}
                    className="w-9 h-9 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm min-h-[36px] min-w-[36px]"
                  >
                    <FiEye className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                    aria-label={isInWishlist(product._id) ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                    className="w-9 h-9 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-rose-500 transition-colors shadow-sm min-h-[36px] min-w-[36px]"
                  >
                    <FiHeart className={`h-3.5 w-3.5 ${isInWishlist(product._id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                <Link to={`/products/${product._id}`} className="block w-full h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'; }}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                </Link>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 px-6 space-x-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full btn-gradient py-3.5 rounded-xl font-bold flex items-center justify-center shadow-xl text-white text-sm"
                  >
                    <FiShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
                  </button>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold tracking-wider uppercase">{product.category}</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className={`w-3.5 h-3.5 ${i < Math.round(product.averageRating || product.rating || 0) ? 'fill-current' : 'text-slate-300 dark:text-slate-700 fill-current'}`} />
                      ))}
                    </div>
                  </div>
                  <Link to={`/products/${product._id}`}>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">{product.name}</h3>
                  </Link>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xl font-black text-slate-900 dark:text-white">{formatPrice(product.price)}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">In Stock</span>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
};
