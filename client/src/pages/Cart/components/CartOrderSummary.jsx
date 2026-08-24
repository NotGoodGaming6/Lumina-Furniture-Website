import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiX } from 'react-icons/fi';
import { useCurrency } from '@/context/CurrencyContext';

export const CartOrderSummary = ({ totalPrice, appliedCoupon, appliedDiscount, finalPrice, applyCoupon, removeCoupon, handleApplyCoupon, couponCode, setCouponCode }) => {
  const { formatPrice } = useCurrency();
  const shipping = finalPrice > 500 ? 0 : 25;
  const tax = finalPrice * 0.08;
  const finalTotal = finalPrice + shipping + tax;

  return (
    <div className="lg:w-[400px] shrink-0">
      <div className="glass-card rounded-[3rem] p-8 shadow-2xl text-slate-900 dark:text-white sticky top-28 space-y-8 overflow-hidden transition-all duration-500 border border-slate-200 dark:border-white/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <h2 className="text-2xl font-black tracking-tight relative z-10 font-display text-slate-900 dark:text-white">Order Summary</h2>

        <div className="space-y-6 relative z-10">
          <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
            <span className="text-base text-slate-700 dark:text-slate-300">Subtotal</span>
            <span className="font-bold text-slate-900 dark:text-white text-lg">{formatPrice(totalPrice)}</span>
          </div>

          {appliedCoupon && (
            <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="text-base">Discount ({appliedCoupon.code})</span>
              <span className="font-bold text-lg">-{formatPrice(appliedDiscount)}</span>
            </div>
          )}

          <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
            <span className="text-base text-slate-700 dark:text-slate-300 flex items-center">
              Shipping
              {shipping === 0 && <span className="ml-2 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">Free</span>}
            </span>
            <span className="font-bold text-slate-900 dark:text-white text-lg">{shipping === 0 ? formatPrice(0) : formatPrice(shipping)}</span>
          </div>

          <div className="flex justify-between items-center text-slate-600 dark:text-slate-400 pb-6 border-b border-slate-200 dark:border-white/10">
            <span className="text-base text-slate-700 dark:text-slate-300">Tax (Estimated 8%)</span>
            <span className="font-bold text-slate-900 dark:text-white text-lg">{formatPrice(tax)}</span>
          </div>

          <div className="pt-4 flex justify-between items-end">
            <div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Total cost</p>
              <p className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                {formatPrice(finalTotal)}
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-4">
          {appliedCoupon ? (
            <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 rounded-2xl py-3 px-4">
              <div>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest text-[10px] flex items-center"><FiCheck className="mr-1" /> Coupon Applied</span>
                <p className="text-slate-900 dark:text-white font-bold">{appliedCoupon.code} (-{appliedCoupon.discountPercentage}%)</p>
              </div>
              <button onClick={removeCoupon} className="text-slate-500 dark:text-slate-400 hover:text-rose-500 transition-colors p-2">
                <FiX className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Promo code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="flex-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold uppercase"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-slate-200 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-800 dark:text-slate-200 font-bold px-6 py-3 rounded-xl transition-all shadow-md"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        <Link
          to="/checkout"
          className="w-full inline-flex items-center justify-center px-8 py-5 text-lg font-black rounded-2xl btn-gradient group relative z-10 overflow-hidden shadow-xl"
        >
          <span className="relative z-10">Proceed to Checkout</span>
          <FiArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform relative z-10" />
        </Link>

        <p className="text-center text-xs font-medium text-slate-500 relative z-10">
          Secure checkout powered by Lumina Payment Systems
        </p>
      </div>
    </div>
  );
};
