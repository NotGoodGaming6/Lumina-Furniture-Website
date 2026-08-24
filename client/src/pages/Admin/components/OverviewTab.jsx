import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { FiTrendingUp, FiShoppingBag, FiUsers, FiDollarSign, FiAlertCircle } from 'react-icons/fi';
import { useGetAnalyticsQuery } from '@/redux/api/adminApiSlice';
import { useCurrency } from '@/context/CurrencyContext';

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm flex items-center space-x-4 transition-transform hover:-translate-y-1 text-slate-900 dark:text-white">
    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
      <Icon className="w-7 h-7" />
    </div>
    <div>
      <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</p>
      <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight font-display">{value}</h3>
      <span className="text-xs font-bold text-emerald-500 flex items-center mt-1">
        <FiTrendingUp className="mr-1"/> {trend}
      </span>
    </div>
  </div>
);

export const OverviewTab = () => {
  const { data: analyticsData, isLoading } = useGetAnalyticsQuery();
  const { formatPrice } = useCurrency();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const data = analyticsData?.data;

  if (!data) {
    return <div className="text-center py-10 text-slate-500 dark:text-slate-400">Failed to load analytics data.</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {data.lowStockProducts?.length > 0 && (
        <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center mb-3">
            <FiAlertCircle className="text-rose-500 w-6 h-6 mr-3" />
            <h3 className="text-lg font-bold text-rose-800 dark:text-rose-300">Low Stock Alerts</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.lowStockProducts.map(product => (
              <div key={product._id} className="bg-white dark:bg-slate-900 px-4 py-3 rounded-xl border border-rose-100 dark:border-rose-900/40 flex justify-between items-center shadow-sm">
                <span className="font-bold text-slate-700 dark:text-slate-200 truncate mr-2" title={product.name}>{product.name}</span>
                <span className="bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
                  {product.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={formatPrice(data.totalRevenue)} icon={FiDollarSign} trend="Real-time" />
        <StatCard title="Total Orders" value={data.totalOrders} icon={FiShoppingBag} trend="Real-time" />
        <StatCard title="Active Clients" value={data.activeUsers} icon={FiUsers} trend="Real-time" />
        <StatCard title="Products" value={data.totalProducts} icon={FiTrendingUp} trend="Real-time" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm text-slate-900 dark:text-white">
          <div className="mb-6">
            <h3 className="text-lg font-black text-slate-900 dark:text-white font-display">Revenue Overview</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Monthly gross volume across all channels</p>
          </div>
          <div className="h-[300px] w-full">
            {data.revenueData.every(d => d.total === 0) ? (
              <div className="h-full flex items-center justify-center text-slate-400 font-medium bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-white/10">
                Not enough sales data to generate chart
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300} minWidth={100} minHeight={300}>
                <AreaChart data={data.revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '1rem', border: 'none', backgroundColor: '#0f172a', color: '#fff', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}
                    labelStyle={{ fontWeight: 'bold', color: '#94a3b8' }}
                    formatter={(value) => [formatPrice(value), 'Revenue']}
                  />
                  <Area type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm text-slate-900 dark:text-white">
          <div className="mb-6">
            <h3 className="text-lg font-black text-slate-900 dark:text-white font-display">Top Performers</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Highest volume items</p>
          </div>
          <div className="h-[300px] w-full -ml-4">
            {data.topProductsData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 font-medium bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-white/10 ml-4">
                No orders yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300} minWidth={100} minHeight={300}>
                <BarChart data={data.topProductsData} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={12} stroke="#94a3b8" width={100} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}} 
                    contentStyle={{ borderRadius: '1rem', border: 'none', backgroundColor: '#0f172a', color: '#fff', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }} 
                    formatter={(value) => [value, 'Sales']}
                  />
                  <Bar dataKey="sales" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
