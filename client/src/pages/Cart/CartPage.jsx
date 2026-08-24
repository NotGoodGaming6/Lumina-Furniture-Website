import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { CartLineItem } from '@/pages/Cart/components/CartLineItem';
import { CartOrderSummary } from '@/pages/Cart/components/CartOrderSummary';
import { useLazyValidateCouponQuery } from '@/redux/api/orderApiSlice';
import { successAlert, errorAlert } from '@/utils/alerts';

export const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    totalPrice, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    finalPrice, 
    appliedDiscount 
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [validateCoupon] = useLazyValidateCouponQuery();

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    try {
      const res = await validateCoupon(couponCode).unwrap();
      applyCoupon(res.data);
      successAlert('Applied!', `Coupon ${res.data.code} applied.`);
      setCouponCode('');
    } catch (err) {
      errorAlert('Invalid', err.data?.error || 'Could not apply coupon');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center pt-20 px-4 transition-colors duration-300">
        <div className="max-w-md w-full text-center space-y-8 glass-card p-12 rounded-[3rem] border border-slate-200 dark:border-white/10 shadow-xl">
          <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto text-indigo-500">
            <FiShoppingBag className="h-10 w-10" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 font-display">Your cart is empty</h2>
            <p className="text-slate-600 dark:text-slate-400">Looks like you haven't added anything to your cart yet.</p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-8 py-4 btn-gradient text-white font-bold rounded-2xl shadow-lg"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-32 pb-24 transition-colors duration-300 selection:bg-brand-500 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <Link to="/products" className="inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-widest mb-4">
              <FiArrowLeft className="mr-2" /> Continue Shopping
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-display">Shopping Bag</h1>
          </div>
          <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
            Currently <span className="text-slate-900 dark:text-white font-bold">{cartItems.length}</span> individual items
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-grow space-y-6">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <CartLineItem
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
            </AnimatePresence>
          </div>

          <CartOrderSummary
            totalPrice={totalPrice}
            appliedCoupon={appliedCoupon}
            appliedDiscount={appliedDiscount}
            finalPrice={finalPrice}
            applyCoupon={applyCoupon}
            removeCoupon={removeCoupon}
            handleApplyCoupon={handleApplyCoupon}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
