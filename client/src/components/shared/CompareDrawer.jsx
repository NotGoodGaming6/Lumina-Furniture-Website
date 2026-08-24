import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiX, FiTrash2, FiShoppingBag, FiStar, FiCheck, FiLayers, FiMinimize2 } from 'react-icons/fi';
import { useCompare } from '@/context/CompareContext';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

export const CompareDrawer = () => {
  const { compareItems, isCompareOpen, setIsCompareOpen, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  if (compareItems.length === 0) return null;

  return (
    <>
      <AnimatePresence>
        {!isCompareOpen && compareItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
          >
            <button
              onClick={() => setIsCompareOpen(true)}
              className="glass bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 backdrop-blur-xl py-3 px-6 rounded-full border border-white/20 dark:border-slate-800 shadow-[0_15px_40px_rgba(0,0,0,0.3)] flex items-center space-x-3 text-xs font-mono font-bold uppercase tracking-wider hover:scale-105 transition-all cursor-pointer"
            >
              <FiLayers className="w-4 h-4 text-amber-400 dark:text-indigo-600" />
              <span>Compare ({compareItems.length})</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCompareOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCompareOpen(false)}
              className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm"
            />

            <motion.aside
              aria-label="Product comparison panel"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="relative w-full max-h-[90vh] overflow-y-auto bg-[#fcfbf9] dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 shadow-[0_-20px_60px_rgba(0,0,0,0.3)] rounded-t-[2.5rem] p-6 sm:p-8 z-10 text-slate-900 dark:text-white"
            >
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-white/10">
                  <div>
                    <div className="flex items-center space-x-2">
                      <FiLayers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
                        Design Comparison
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light">
                      Compare craftsmanship, dimensions, and specifications side-by-side.
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={clearCompare}
                      className="py-2 px-3 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-300 transition-colors flex items-center space-x-1.5 cursor-pointer"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Clear All</span>
                    </button>
                    <button
                      onClick={() => setIsCompareOpen(false)}
                      aria-label="Close comparison panel"
                      className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto pt-6">
                  <table className="w-full min-w-[700px] text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-white/5">
                        <th className="py-4 px-4 w-40 text-xs font-mono uppercase tracking-widest text-slate-400">
                          Product
                        </th>
                        {compareItems.map((item) => (
                          <th key={item._id} className="py-4 px-4 w-60 align-top">
                            <div className="relative group editorial-card rounded-2xl p-4 border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-900">
                              <button
                                onClick={() => removeFromCompare(item._id)}
                                aria-label={`Remove ${item.name} from comparison`}
                                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-500 flex items-center justify-center transition-colors shadow-xs cursor-pointer z-10"
                              >
                                <FiX className="w-3.5 h-3.5" />
                              </button>
                              <Link to={`/product/${item._id}`} onClick={() => setIsCompareOpen(false)}>
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-36 object-cover rounded-xl mb-3 group-hover:scale-102 transition-transform duration-300"
                                />
                                <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                                  {item.name}
                                </h4>
                              </Link>
                              <div className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                                {formatPrice(item.price)}
                              </div>
                              <button
                                onClick={() => addToCart(item, 1)}
                                className="w-full mt-3 py-2 px-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-mono font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
                              >
                                <FiShoppingBag className="w-3.5 h-3.5" />
                                <span>Add to Cart</span>
                              </button>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-xs font-sans">
                      <tr>
                        <td className="py-3.5 px-4 font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                          Category
                        </td>
                        {compareItems.map((item) => (
                          <td key={item._id} className="py-3.5 px-4 font-medium">
                            <span className="inline-block py-1 px-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                              {item.category || 'Atelier'}
                            </span>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                          Rating
                        </td>
                        {compareItems.map((item) => (
                          <td key={item._id} className="py-3.5 px-4">
                            <div className="flex items-center space-x-1 text-amber-500 font-bold">
                              <FiStar className="w-3.5 h-3.5 fill-current" />
                              <span>{item.averageRating || item.rating || 5.0}</span>
                              <span className="text-slate-400 font-normal">
                                ({item.numReviews || 0} reviews)
                              </span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                          Materials
                        </td>
                        {compareItems.map((item) => (
                          <td key={item._id} className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                            {item.category === 'Furniture' && 'Solid Scandinavian Oak, Natural Linen'}
                            {item.category === 'Lighting' && 'Brushed Brass, Hand-Blown Opal Glass'}
                            {item.category === 'Decor' && 'Hand-Cast Stoneware, Matte Glaze'}
                            {!['Furniture', 'Lighting', 'Decor'].includes(item.category) && 'Solid Timber, Eco-Friendly Finish'}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                          Warranty
                        </td>
                        {compareItems.map((item) => (
                          <td key={item._id} className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                            <div className="flex items-center space-x-1">
                              <FiCheck className="w-3.5 h-3.5" />
                              <span>5-Year Structural</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                          Trial Period
                        </td>
                        {compareItems.map((item) => (
                          <td key={item._id} className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                            30-Day Residence Trial
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                          Description
                        </td>
                        {compareItems.map((item) => (
                          <td key={item._id} className="py-3.5 px-4 text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                            {item.description || 'Architectural Scandinavian craftsmanship with timeless proportions.'}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CompareDrawer;
