import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiChevronRight, FiCreditCard, FiMapPin, FiPackage } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { useCreateOrderMutation } from '@/redux/api/orderApiSlice';
import { errorAlert, successAlert } from '@/utils/alerts';

const steps = ['Shipping', 'Payment', 'Review'];

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart, appliedCoupon, appliedDiscount } = useCart();
  const [createOrder, { isLoading: placingOrder }] = useCreateOrderMutation();

  const [currentStep, setCurrentStep] = useState(0);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    zip: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('Card');

  const shipping = totalPrice > 150 ? 0 : 25;
  const tax = totalPrice * 0.08;
  const grandTotal = Math.max(0, totalPrice - appliedDiscount) + shipping + tax;

  const handlePlaceOrder = async () => {
    try {
      const orderPayload = {
        orderItems: cartItems.map(item => ({
          product: item._id || item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          qty: item.quantity
        })),
        shippingAddress,
        paymentMethod,
        totalPrice: grandTotal,
        couponCode: appliedCoupon?.code || undefined,
        discountAmount: appliedDiscount || 0
      };

      const res = await createOrder(orderPayload).unwrap();
      clearCart();
      successAlert('Order Placed!', `Your architectural order #${res.data?._id?.slice(-6) || ''} has been placed.`);
      navigate('/orders');
    } catch (err) {
      errorAlert('Checkout Failed', err.data?.error || err.message || 'Could not place order');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-4">
          <FiPackage className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif text-slate-900 dark:text-white mb-2">Your Shopping Bag is Empty</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Add curated pieces to your bag before proceeding to checkout.</p>
        <button
          onClick={() => navigate('/products')}
          className="px-8 py-3.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full font-mono text-xs uppercase tracking-widest font-bold"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-normal text-slate-900 dark:text-white tracking-tight mb-2">Checkout</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-light">Complete your order with secure white-glove fulfillment.</p>
        </div>

        <div className="flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <React.Fragment key={step}>
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all ${
                  index <= currentStep 
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md' 
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}>
                  {index < currentStep ? <FiCheck className="h-4 w-4" /> : index + 1}
                </div>
                <span className={`ml-3 font-mono text-xs uppercase tracking-wider hidden sm:block ${
                  index <= currentStep ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-400'
                }`}>
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 sm:w-20 h-px mx-4 transition-all ${
                  index < currentStep ? 'bg-slate-900 dark:bg-white' : 'bg-slate-200 dark:bg-slate-800'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 overflow-hidden relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200/80 dark:border-white/10"
              >
              {currentStep === 0 && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                    <FiMapPin className="mr-3 text-slate-700 dark:text-slate-300" /> Shipping Address
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Street Address</label>
                      <input 
                        type="text" 
                        value={shippingAddress.street} 
                        onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white text-sm" 
                        placeholder="123 Bredgade" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">City</label>
                      <input 
                        type="text" 
                        value={shippingAddress.city} 
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white text-sm" 
                        placeholder="Copenhagen" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Postal Code</label>
                      <input 
                        type="text" 
                        value={shippingAddress.zip} 
                        onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white text-sm" 
                        placeholder="1260" 
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Country</label>
                      <input 
                        type="text" 
                        value={shippingAddress.country} 
                        onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white text-sm" 
                        placeholder="Denmark" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                    <FiCreditCard className="mr-3 text-slate-700 dark:text-slate-300" /> Payment Method
                  </h2>
                  <div className="space-y-4">
                    {['Card', 'PayPal', 'Cash on Delivery'].map(method => (
                      <label 
                        key={method} 
                        onClick={() => setPaymentMethod(method)} 
                        className={`flex items-center p-4 rounded-2xl border cursor-pointer transition-all ${
                          paymentMethod === method 
                            ? 'border-slate-900 dark:border-white bg-slate-900/5 dark:bg-white/5 font-semibold' 
                            : 'border-slate-200 dark:border-white/10 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border mr-4 flex items-center justify-center ${
                          paymentMethod === method ? 'border-slate-900 dark:border-white' : 'border-slate-300 dark:border-slate-600'
                        }`}>
                          {paymentMethod === method && <div className="w-2.5 h-2.5 rounded-full bg-slate-900 dark:bg-white" />}
                        </div>
                        <span className="text-sm text-slate-900 dark:text-white">{method}</span>

                        <span className="ml-auto text-slate-400">
                          {method === 'Card' && <FiCreditCard className="h-5 w-5" />}
                          {method === 'Cash on Delivery' && <FiPackage className="h-5 w-5" />}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                    <FiPackage className="mr-3 text-slate-700 dark:text-slate-300" /> Order Review
                  </h2>
                  <div className="space-y-4 mb-6 max-h-72 overflow-y-auto">
                    {cartItems.map(item => (
                      <div key={item._id || item.id} className="flex items-center p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-white/10">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                        <div className="ml-4 flex-grow">
                          <h4 className="font-serif font-bold text-slate-900 dark:text-white text-sm">{item.name}</h4>
                          <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-mono font-semibold text-slate-900 dark:text-white text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-200 dark:border-white/10 pt-4 space-y-2 text-xs font-mono">
                    <p className="text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white uppercase tracking-wider">Destination:</strong> {shippingAddress.street}, {shippingAddress.city} {shippingAddress.zip}, {shippingAddress.country}</p>
                    <p className="text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white uppercase tracking-wider">Method:</strong> {paymentMethod}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8 pt-6 border-t border-slate-100 dark:border-white/5">
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  disabled={currentStep === 0}
                  className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs uppercase tracking-wider font-semibold rounded-full hover:bg-slate-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Back
                </button>
                {currentStep < steps.length - 1 ? (
                  <button
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    disabled={currentStep === 0 && (!shippingAddress.street || !shippingAddress.city || !shippingAddress.zip || !shippingAddress.country)}
                    className="px-8 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-mono text-xs uppercase tracking-widest font-bold rounded-full flex items-center hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
                  >
                    Continue <FiChevronRight className="ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={placingOrder}
                    className="px-8 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-mono text-xs uppercase tracking-widest font-bold rounded-full flex items-center hover:opacity-90 transition-opacity disabled:opacity-50 shadow-md"
                  >
                    {placingOrder ? 'Fulfilling...' : 'Confirm Order'} <FiCheck className="ml-2" />
                  </button>
                )}
              </div>
            </motion.div>
            </AnimatePresence>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-white/10 h-fit sticky top-28">
            <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white mb-6">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600 dark:text-slate-400 font-light"><span>Subtotal ({cartItems.length} items)</span><span className="font-mono font-semibold text-slate-900 dark:text-white">${totalPrice.toFixed(2)}</span></div>
              {appliedCoupon && (
                <div className="flex justify-between text-amber-700 dark:text-amber-400 font-mono text-xs font-semibold"><span>Discount ({appliedCoupon.code})</span><span>-${appliedDiscount.toFixed(2)}</span></div>
              )}
              <div className="flex justify-between text-slate-600 dark:text-slate-400 font-light"><span>White-Glove Shipping</span><span className="font-mono font-semibold text-slate-900 dark:text-white">{shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400 font-light"><span>Estimated Tax</span><span className="font-mono font-semibold text-slate-900 dark:text-white">${tax.toFixed(2)}</span></div>
              <div className="border-t border-slate-200 dark:border-white/10 pt-4 flex justify-between text-base font-serif font-bold text-slate-900 dark:text-white">
                <span>Grand Total</span><span className="font-mono text-lg">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Checkout = CheckoutPage;
