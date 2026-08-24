import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiClock, FiTruck, FiCheckCircle, FiXCircle, FiChevronRight, FiPrinter, FiCheck, FiMapPin } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useGetMyOrdersQuery } from '@/redux/api/orderApiSlice';
import { generateOrderInvoice } from '@/utils/invoiceGenerator';

const statusConfig = {
  pending: { color: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20', icon: FiClock, label: 'Pending' },
  processing: { color: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20', icon: FiPackage, label: 'Processing' },
  shipped: { color: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20', icon: FiTruck, label: 'Shipped' },
  delivered: { color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20', icon: FiCheckCircle, label: 'Delivered' },
  cancelled: { color: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20', icon: FiXCircle, label: 'Cancelled' },
};

const STEPPER_STAGES = [
  { key: 'pending', title: 'Order Placed', desc: 'Registered at Studio Atelier' },
  { key: 'processing', title: 'Crafting & Inspection', desc: 'Handcrafting & Quality Check' },
  { key: 'shipped', title: 'White-Glove Transit', desc: 'Dispatched with Tracking' },
  { key: 'delivered', title: 'Delivered & Placed', desc: 'Residence Setup Complete' },
];

const getStepIndex = (status) => {
  switch (status) {
    case 'pending': return 0;
    case 'processing': return 1;
    case 'shipped': return 2;
    case 'delivered': return 3;
    case 'cancelled': return -1;
    default: return 0;
  }
};

export const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [expandedOrder, setExpandedOrder] = useState(null);

  const { data: ordersData, isLoading: loading } = useGetMyOrdersQuery(undefined, {
    skip: !user
  });

  const orders = ordersData?.data || [];

  useEffect(() => {
    if (!user) { navigate('/login'); }
  }, [user, navigate]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#fcfbf9] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 block mb-2">PERSONAL COLLECTION & HISTORY</span>
          <h1 className="text-4xl font-serif font-normal text-slate-900 dark:text-white tracking-tight mb-2">My Studio Orders</h1>
          <p className="text-slate-600 dark:text-slate-400 font-light">Track your acquisitions, white-glove deliveries, and official studio invoices.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-slate-900 dark:border-white border-t-transparent rounded-full animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 editorial-card rounded-3xl border border-slate-200 dark:border-white/10 p-8 shadow-sm">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-900 dark:text-white">
              <FiPackage className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2">No acquisitions recorded</h2>
            <p className="text-slate-600 dark:text-slate-400 font-light mb-6">Explore our curated Scandinavian collection to make your first studio order.</p>
            <button onClick={() => navigate('/products')} className="px-8 py-3.5 btn-gradient text-white font-mono text-xs uppercase font-bold rounded-xl shadow-md min-h-[44px]">
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const status = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = status.icon;
              const isExpanded = expandedOrder === order._id;
              const currentStep = getStepIndex(order.status);
              const isCancelled = order.status === 'cancelled';

              return (
                <motion.div
                  key={order._id}
                  layout
                  className="editorial-card rounded-3xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  <button
                    onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
                    aria-label={`Toggle details for order ${order._id}`}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${status.color}`}>
                        <StatusIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-mono font-bold text-slate-900 dark:text-white text-base">Order #{order._id.slice(-8).toUpperCase()}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${status.color}`}>
                        {status.label}
                      </span>
                      <span className="font-bold font-serif text-slate-900 dark:text-white text-lg">
                        ${(order.totalPrice ?? 0).toFixed(2)}
                      </span>
                      <FiChevronRight className={`text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                  </button>

                  {!isCancelled && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-white/5">
                      <div className="relative flex items-center justify-between w-full max-w-2xl mx-auto my-4">
                        <div className="absolute top-4 left-4 right-4 h-1 bg-slate-200 dark:bg-slate-800 -z-0">
                          <div
                            className="h-full bg-slate-900 dark:bg-white transition-all duration-500"
                            style={{ width: `${(currentStep / (STEPPER_STAGES.length - 1)) * 100}%` }}
                          />
                        </div>

                        {STEPPER_STAGES.map((stage, idx) => {
                          const isDone = idx <= currentStep;
                          const isCurrent = idx === currentStep;

                          return (
                            <div key={idx} className="relative z-10 flex flex-col items-center group">
                              <div
                                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 border-2 ${
                                  isDone
                                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md'
                                    : 'bg-white text-slate-400 dark:bg-slate-900 dark:text-slate-600 border-slate-300 dark:border-slate-800'
                                } ${isCurrent ? 'ring-4 ring-slate-900/10 dark:ring-white/10 scale-110' : ''}`}
                              >
                                {isDone ? <FiCheck className="w-4 h-4" /> : idx + 1}
                              </div>
                              <span className={`text-[11px] font-mono mt-2 font-medium text-center hidden sm:block ${
                                isDone ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-400 dark:text-slate-600'
                              }`}>
                                {stage.title}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="px-6 pb-6 border-t border-slate-200 dark:border-white/10"
                    >
                      <div className="pt-4 space-y-3">
                        {order.orderItems.map((item, idx) => (
                          <div key={idx} className="flex items-center p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-white/10">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'; }}
                              className="w-14 h-14 rounded-xl object-cover" 
                            />
                            <div className="ml-4 flex-grow">
                              <p className="font-semibold text-slate-900 dark:text-white text-sm">{item.name}</p>
                              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">Quantity: {item.qty || item.quantity || 1}</p>
                            </div>
                            <span className="font-bold text-sm text-slate-900 dark:text-white">${((item.price || 0) * (item.qty || item.quantity || 1)).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-light text-slate-600 dark:text-slate-400">
                        <div className="space-y-1">
                          <p className="flex items-center space-x-1.5">
                            <FiMapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span><strong className="font-semibold text-slate-900 dark:text-white">Delivery Address:</strong> {order.shippingAddress?.address || order.shippingAddress?.street}, {order.shippingAddress?.city} {order.shippingAddress?.postalCode || order.shippingAddress?.zip}, {order.shippingAddress?.country}</span>
                          </p>
                          <p className="pl-5"><strong className="font-semibold text-slate-900 dark:text-white">Payment Method:</strong> {order.paymentMethod || 'Credit Card'}</p>
                        </div>

                        <button
                          onClick={() => generateOrderInvoice(order)}
                          className="min-h-[44px] px-5 py-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl font-mono text-xs uppercase font-bold tracking-wider hover:opacity-90 transition-all flex items-center shrink-0 shadow-sm"
                        >
                          <FiPrinter className="mr-2 w-4 h-4" /> Official Invoice
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
