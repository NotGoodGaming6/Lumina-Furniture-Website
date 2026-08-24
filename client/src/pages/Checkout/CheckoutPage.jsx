import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiPackage, FiMapPin, FiCreditCard, FiCheck, FiChevronRight, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useCreateOrderMutation } from '@/redux/api/orderApiSlice';
import { successAlert, errorAlert } from '@/utils/alerts';

const steps = ['Shipping', 'Payment', 'Review'];

export const Checkout = () => {
  const { cartItems, totalPrice, finalPrice, appliedDiscount, appliedCoupon, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    street: '', city: '', zip: '', country: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('Card');

  const shipping = finalPrice > 500 ? 0 : 25;
  const tax = finalPrice * 0.08;
  const grandTotal = finalPrice + shipping + tax;

  if (!user) {
    navigate('/login');
    return null;
  }

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
            <FiShoppingBag className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Your cart is empty</h2>
          <p className="text-slate-500 mb-6">Add some products before checking out.</p>
          <button onClick={() => navigate('/products')} className="px-6 py-3 bg-brand-500 text-white font-bold rounded-xl hover:bg-brand-600 transition-colors">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const [createOrder, { isLoading: placingOrder }] = useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    try {
      const orderItems = cartItems.map(item => ({
        product: item._id || item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        qty: item.quantity
      }));

      await createOrder({
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice: grandTotal,
        couponCode: appliedCoupon?.code || undefined,
        discountAmount: appliedDiscount || 0
      }).unwrap();

      clearCart();
      successAlert('Order Placed!', 'Your order has been placed successfully.');
      navigate('/orders');
    } catch (err) {
      errorAlert('Order Failed', err.data?.error || 'Failed to place order');
    }
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2 font-display">Checkout</h1>
          <p className="text-slate-600 dark:text-slate-400">Complete your order in just a few steps.</p>
        </div>

        <div className="flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <React.Fragment key={step}>
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${index <= currentStep ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}>
                  {index < currentStep ? <FiCheck className="h-5 w-5" /> : index + 1}
                </div>
                <span className={`ml-3 font-semibold text-sm hidden sm:block ${index <= currentStep ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>{step}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 sm:w-24 h-0.5 mx-4 rounded-full transition-all ${index < currentStep ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
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
                className="glass-card rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-white/10"
              >
              {currentStep === 0 && (
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center font-display"><FiMapPin className="mr-3 text-indigo-500" /> Shipping Address</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Street Address</label>
                      <input type="text" value={shippingAddress.street} onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="123 Main Street" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">City</label>
                      <input type="text" value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="New York" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">ZIP Code</label>
                      <input type="text" value={shippingAddress.zip} onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="10001" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Country</label>
                      <input type="text" value={shippingAddress.country} onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="United States" />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center font-display"><FiCreditCard className="mr-3 text-indigo-500" /> Payment Method</h2>
                  <div className="space-y-4">
                    {['Card', 'PayPal', 'Cash on Delivery'].map(method => (
                      <label key={method} onClick={() => setPaymentMethod(method)} className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === method ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-200 dark:border-white/10 hover:border-slate-300'
                        }`}>
                        <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${paymentMethod === method ? 'border-indigo-500' : 'border-slate-300 dark:border-slate-600'
                          }`}>
                          {paymentMethod === method && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />}
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">{method}</span>

                        <span className="ml-auto text-slate-400">
                          {method === 'Card' && <FiCreditCard className="h-5 w-5" />}
                          {method === 'PayPal' && <span className="text-sm font-black text-blue-500">P</span>}
                          {method === 'Cash on Delivery' && <FiPackage className="h-5 w-5" />}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center font-display"><FiPackage className="mr-3 text-indigo-500" /> Order Review</h2>
                  <div className="space-y-4 mb-6">
                    {cartItems.map(item => (
                      <div key={item._id || item.id} className="flex items-center p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/10">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                        <div className="ml-4 flex-grow">
                          <h4 className="font-bold text-slate-900 dark:text-white">{item.name}</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-200 dark:border-white/10 pt-4 space-y-2">
                    <p className="text-sm text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white">Ship to:</strong> {shippingAddress.street}, {shippingAddress.city} {shippingAddress.zip}, {shippingAddress.country}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white">Payment:</strong> {paymentMethod}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  disabled={currentStep === 0}
                  className="px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Back
                </button>
                {currentStep < steps.length - 1 ? (
                  <button
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    disabled={currentStep === 0 && (!shippingAddress.street || !shippingAddress.city || !shippingAddress.zip || !shippingAddress.country)}
                    className="px-6 py-3 btn-gradient text-white font-bold rounded-xl flex items-center disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue <FiChevronRight className="ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={placingOrder}
                    className="px-8 py-3 btn-gradient text-white font-bold rounded-xl flex items-center disabled:opacity-50"
                  >
                    {placingOrder ? 'Placing...' : 'Place Order'} <FiCheck className="ml-2" />
                  </button>
                )}
              </div>
            </motion.div>
            </AnimatePresence>
          </div>

          <div className="glass-card rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-white/10 h-fit sticky top-28">
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 font-display">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600 dark:text-slate-400"><span>Subtotal ({cartItems.length} items)</span><span className="font-bold text-slate-900 dark:text-white">${totalPrice.toFixed(2)}</span></div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium"><span>Discount ({appliedCoupon.code})</span><span>-${appliedDiscount.toFixed(2)}</span></div>
              )}
              <div className="flex justify-between text-slate-600 dark:text-slate-400"><span>Shipping</span><span className="font-bold text-slate-900 dark:text-white">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400"><span>Tax</span><span className="font-bold text-slate-900 dark:text-white">${tax.toFixed(2)}</span></div>
              <div className="border-t border-slate-200 dark:border-white/10 pt-3 flex justify-between text-lg font-black text-slate-900 dark:text-white">
                <span>Total</span><span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
