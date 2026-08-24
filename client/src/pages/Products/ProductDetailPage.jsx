import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiMinus, FiPlus, FiShoppingBag, FiHeart, FiStar, FiCheck, FiTruck, FiShield, FiMessageSquare, FiTrash2, FiLayers } from 'react-icons/fi';
import { 
  useGetProductByIdQuery, 
  useGetProductReviewsQuery, 
  useCreateReviewMutation, 
  useDeleteReviewMutation 
} from '@/redux/api/productApiSlice';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCompare } from '@/context/CompareContext';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { successAlert, errorAlert, confirmAlert } from '@/utils/alerts';
import { ProductDetailSkeleton } from '@/components/shared/SkeletonLoader';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-200 dark:border-white/10 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left focus:outline-none group"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-slate-700 dark:text-slate-300 font-bold group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
          {title}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-slate-400">
          {isOpen ? <FiMinus /> : <FiPlus />}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4 text-slate-600 dark:text-slate-400 text-sm font-light leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toggleCompare, isInCompare } = useCompare();
  const { user } = useAuth();
  const { formatPrice } = useCurrency();

  const { data: res, isLoading: loading, isError } = useGetProductByIdQuery(id);
  const { data: reviewsRes, isLoading: loadingReviews } = useGetProductReviewsQuery(id);
  const [createReview, { isLoading: submittingReview }] = useCreateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const navigate = useNavigate();

  const product = res?.data;
  const reviews = reviewsRes?.data || [];

  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (isError) {
      errorAlert('Product not found', 'The item you are looking for does not exist.');
      navigate('/products');
    }
  }, [isError, navigate]);

  const handleAddToCart = async () => {
    setAdding(true);
    await addToCart(product, quantity);
    setTimeout(() => setAdding(false), 500);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      errorAlert('Authentication Required', 'Please log in to leave a review.');
      navigate('/login');
      return;
    }

    if (!comment.trim()) {
      errorAlert('Input Required', 'Please provide a comment for your review.');
      return;
    }

    try {
      await createReview({ productId: id, rating, comment }).unwrap();
      successAlert('Thank You', 'Your review has been published.');
      setComment('');
      setRating(5);
    } catch (err) {
      errorAlert('Review Submission Failed', err?.data?.error || 'Could not submit review.');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const isConfirmed = await confirmAlert(
      'Delete Review',
      'Are you sure you want to remove your review?',
      'Delete'
    );

    if (isConfirmed) {
      try {
        await deleteReview({ reviewId, productId: id }).unwrap();
        successAlert('Removed', 'Review deleted successfully.');
      } catch (err) {
        errorAlert('Error', 'Failed to delete review.');
      }
    }
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) return null;

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="min-h-screen bg-[#fcfbf9] dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-32 pb-24 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link to="/products" className="inline-flex items-center text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors group">
            <FiArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" /> Back to Collection
          </Link>
          <Breadcrumbs
            items={[
              { label: 'Products', url: '/products' },
              { label: product.category || 'Atelier', url: '/products' },
              { label: product.name }
            ]}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-24">

          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative aspect-[4/5] editorial-card rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1000'; }}
                className="w-full h-full object-cover origin-center hover:scale-105 transition-transform duration-700 ease-out"
              />
              {(product.stock || 0) <= 5 && (product.stock || 0) > 0 && (
                <div className="absolute top-6 left-6 bg-amber-600 text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                  Low Stock
                </div>
              )}
              {(product.stock || 0) === 0 && (
                <div className="absolute top-6 left-6 bg-rose-600 text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                  Sold Out
                </div>
              )}

              <button 
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist(product);
                }}
                aria-label="Toggle wishlist"
                className={`absolute top-6 right-6 p-4 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-all shadow-lg min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  isInWishlist(product._id) 
                    ? 'text-rose-500 border border-rose-500/50' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-rose-500'
                }`}
              >
                <FiHeart className={`w-5 h-5 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
              </button>
            </motion.div>
          </div>

          <div className="lg:w-1/2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div className="mb-4 flex items-center space-x-3">
                <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-white/10">
                  {product.category}
                </span>
                
                <div className="flex items-center space-x-1 text-amber-500 text-sm">
                  <FiStar className="fill-current w-4 h-4" />
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white ml-1">{avgRating}</span>
                  <span className="text-slate-400 font-mono text-xs">({reviews.length})</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-slate-900 dark:text-white tracking-tight leading-none mb-6">
                {product.name}
              </h1>

              <div className="text-3xl font-serif font-semibold text-slate-900 dark:text-white tracking-tight mb-8">
                {formatPrice(product.price)}
              </div>

              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-light mb-10">
                {product.description}
              </p>

              <div className="editorial-card p-6 rounded-2xl border border-slate-200 dark:border-white/10 mb-12">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center justify-between border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 sm:w-36 bg-slate-50 dark:bg-slate-800/80">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors disabled:opacity-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <FiMinus />
                    </button>
                    <input 
                      type="number"
                      value={quantity}
                      onWheel={(e) => e.target.blur()}
                      onChange={(e) => {
                        let val = parseInt(e.target.value, 10);
                        if (isNaN(val) || val < 1) val = 1;
                        if (val > (product?.stock || 10)) val = product.stock || 10;
                        setQuantity(val);
                      }}
                      className="font-mono font-bold text-slate-900 dark:text-white w-8 text-center bg-transparent border-none focus:ring-0 p-0 m-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                      className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors disabled:opacity-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      disabled={quantity >= (product.stock || 10)}
                      aria-label="Increase quantity"
                    >
                      <FiPlus />
                    </button>
                  </div>

                  <button 
                    onClick={handleAddToCart}
                    disabled={(product.stock || 10) === 0 || adding}
                    className="flex-1 btn-gradient py-4 px-8 rounded-xl font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center shadow-lg disabled:opacity-50 disabled:pointer-events-none group min-h-[44px]"
                  >
                    {adding ? (
                      <span className="flex items-center"><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white dark:border-slate-900 mr-2"></div> Adding...</span>
                    ) : (product.stock || 10) === 0 ? (
                      'Sold Out'
                    ) : (
                      <span className="flex items-center"><FiShoppingBag className="mr-3 w-4 h-4"/> Add to Cart</span>
                    )}
                  </button>

                  <button
                    onClick={() => toggleCompare(product)}
                    title={isInCompare(product._id) ? "Remove from Comparison" : "Compare Specifications"}
                    aria-label="Compare specifications"
                    className={`p-4 rounded-xl border transition-colors flex items-center justify-center min-h-[44px] min-w-[44px] ${
                      isInCompare(product._id)
                        ? 'border-amber-500 bg-amber-500/10 text-amber-500'
                        : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-amber-500 hover:border-amber-400 bg-slate-50 dark:bg-slate-800/80'
                    }`}
                  >
                    <FiLayers className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    aria-label="Add to wishlist"
                    className="p-4 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-rose-500 hover:border-rose-300 bg-slate-50 dark:bg-slate-800/80 transition-colors flex items-center justify-center min-h-[44px] min-w-[44px]"
                  >
                    <FiHeart className={`w-5 h-5 ${isInWishlist(product._id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-white/10">
                <Accordion title="Craftsmanship & Care" defaultOpen={true}>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400 font-light">
                    <li>Handcrafted from solid Scandinavian oak and architectural ceramic glazes.</li>
                    <li>Avoid direct exposure to radiators to preserve natural wood moisture balance.</li>
                    <li>Wipe clean using a soft dry lint-free cloth. Wax once every 6 months.</li>
                  </ul>
                </Accordion>
                <Accordion title="White-Glove Shipping & Returns">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FiTruck className="w-5 h-5 text-slate-900 dark:text-white mt-0.5 mr-3 shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white mb-1">White-Glove Delivery</p>
                        <p className="text-slate-600 dark:text-slate-400 font-light">Specialized uncrating, room assembly, and packaging disposal included.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FiShield className="w-5 h-5 text-slate-900 dark:text-white mt-0.5 mr-3 shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white mb-1">30-Day Residence Trial</p>
                        <p className="text-slate-600 dark:text-slate-400 font-light">Complimentary return pickup if the piece does not harmonize with your studio.</p>
                      </div>
                    </div>
                  </div>
                </Accordion>
              </div>

            </motion.div>
          </div>

        </div>

        <div className="border-t border-slate-200 dark:border-white/10 pt-16 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 block mb-2">
                CUSTOMER FEEDBACK & JOURNAL
              </span>
              <h2 className="text-3xl font-serif font-normal text-slate-900 dark:text-white">
                Studio Reviews ({reviews.length})
              </h2>
            </div>

            <div className="flex items-center space-x-4 editorial-card px-6 py-4 rounded-2xl border border-slate-200 dark:border-white/10">
              <div className="text-3xl font-serif font-bold text-slate-900 dark:text-white">{avgRating}</div>
              <div>
                <div className="flex text-amber-500 text-sm">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar key={star} className={`w-4 h-4 ${star <= Math.round(Number(avgRating)) ? 'fill-current' : 'text-slate-300 dark:text-slate-700'}`} />
                  ))}
                </div>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">Based on {reviews.length} verified review{reviews.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <form onSubmit={handleReviewSubmit} className="editorial-card p-8 rounded-2xl border border-slate-200 dark:border-white/10 space-y-6">
                <h3 className="text-xl font-serif font-semibold text-slate-900 dark:text-white">
                  Write an Object Review
                </h3>

                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-2">
                    Your Rating *
                  </label>
                  <div className="flex space-x-2 text-amber-500 cursor-pointer">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        aria-label={`Rate ${star} out of 5 stars`}
                        className="p-1 focus:outline-none transition-transform hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        <FiStar className={`w-6 h-6 ${(hoverRating || rating) >= star ? 'fill-current text-amber-500' : 'text-slate-300 dark:text-slate-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-2">
                    Your Experience & Feedback *
                  </label>
                  <textarea
                    required
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share how this object integrates with your space..."
                    className="w-full bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 outline-none text-sm font-sans resize-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="w-full btn-gradient py-3.5 px-6 rounded-xl font-mono text-xs uppercase tracking-widest font-bold shadow-md flex items-center justify-center min-h-[44px]"
                >
                  {submittingReview ? 'Publishing...' : 'Publish Review'} <FiMessageSquare className="ml-2 w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {reviews.length === 0 ? (
                <div className="editorial-card p-12 rounded-2xl border border-slate-200 dark:border-white/10 text-center text-slate-400 font-light">
                  No reviews have been written for this object yet. Be the first to share your experience!
                </div>
              ) : (
                reviews.map((rev) => {
                  const isAuthor = user && (user._id === rev.user?._id || user._id === rev.user);
                  const canDelete = isAuthor || user?.role === 'admin';

                  return (
                    <div key={rev._id} className="editorial-card p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs flex items-center justify-center shrink-0">
                            {rev.user?.name?.charAt(0).toUpperCase() || 'A'}
                          </div>
                          <div>
                            <div className="font-serif font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                              {rev.user?.name || 'Anonymous Collector'}
                              <span className="text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                                Verified Buyer
                              </span>
                            </div>
                            <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                              {new Date(rev.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="flex text-amber-500 text-xs">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FiStar key={star} className={`w-3.5 h-3.5 ${star <= rev.rating ? 'fill-current' : 'text-slate-300 dark:text-slate-700'}`} />
                            ))}
                          </div>
                          {canDelete && (
                            <button
                              onClick={() => handleDeleteReview(rev._id)}
                              aria-label="Delete review"
                              className="text-slate-400 hover:text-rose-500 transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                              title="Delete Review"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      <p className="text-sm font-light text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                        {rev.comment}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
