import React from 'react';
import { FiPackage, FiClock, FiTruck, FiCheckCircle, FiPrinter } from 'react-icons/fi';
import { useGetAdminOrdersQuery, useUpdateOrderStatusMutation } from '@/redux/api/adminApiSlice';
import { errorAlert, successAlert } from '@/utils/alerts';
import { generateOrderInvoice } from '@/utils/invoiceGenerator';

const orderStatusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const statusColors = {
  pending: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20',
  processing: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20',
  shipped: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20',
  delivered: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20',
  cancelled: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20',
};

export const OrdersTab = () => {
  const { data: ordersData, isLoading: loadingOrders } = useGetAdminOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const orders = ordersData?.data || [];

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus({ id: orderId, status: newStatus }).unwrap();
      successAlert('Updated', `Order status changed to ${newStatus}`);
    } catch (err) {
      errorAlert('Error', 'Failed to update order status');
    }
  };

  if (loadingOrders) {
    return (
      <div className="flex justify-center p-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">Customer Orders</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-1">Review live store purchases and update fulfillment status</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <FiPackage className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400 font-medium">No orders recorded yet.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10">
                <th className="pb-4 pl-4">Order ID</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Items</th>
                <th className="pb-4">Total</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm font-light">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 pl-4 font-mono font-bold text-slate-900 dark:text-white text-sm">
                    #{order._id.slice(-8).toUpperCase()}
                  </td>
                  <td className="py-4 text-slate-900 dark:text-slate-200 font-medium">
                    {order.user?.name || 'Guest User'}
                  </td>
                  <td className="py-4 text-slate-600 dark:text-slate-400 font-mono text-xs">
                    {order.orderItems?.length || 0} item{order.orderItems?.length !== 1 ? 's' : ''}
                  </td>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">
                    ${(order.totalPrice ?? 0).toFixed(2)}
                  </td>
                  <td className="py-4 text-slate-500 dark:text-slate-400 font-mono text-xs">
                    {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${statusColors[order.status] || 'bg-slate-100 text-slate-600'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-right pr-4">
                    <div className="flex items-center justify-end space-x-2">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                        aria-label={`Update status for order ${order._id}`}
                        className="text-xs font-mono font-medium border border-slate-200/80 dark:border-white/10 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white bg-white dark:bg-slate-900 text-slate-900 dark:text-white cursor-pointer shadow-xs min-h-[40px]"
                      >
                        {orderStatusOptions.map(s => (
                          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                      </select>

                      <button
                        onClick={() => generateOrderInvoice(order)}
                        aria-label={`Print invoice for order ${order._id}`}
                        className="min-h-[44px] min-w-[44px] p-2.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center justify-center border border-slate-200 dark:border-white/10"
                        title="Print Invoice"
                      >
                        <FiPrinter className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
