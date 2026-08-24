import React, { useState } from 'react';
import { AdminLayout } from '@/components/layouts/admin/AdminLayout';
import { OverviewTab } from '@/pages/Admin/components/OverviewTab';
import { InventoryTab } from '@/pages/Admin/components/InventoryTab';
import { OrdersTab } from '@/pages/Admin/components/OrdersTab';
import { CouponsTab } from '@/pages/Admin/components/CouponsTab';
import { UsersTab } from '@/pages/Admin/components/UsersTab';

export const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
          {activeTab === 'overview' && 'Live Analytics'}
          {activeTab === 'inventory' && 'Inventory Management'}
          {activeTab === 'orders' && 'Order Management'}
          {activeTab === 'coupons' && 'Coupon Management'}
          {activeTab === 'users' && 'User Management'}
        </h2>
        <p className="text-sm font-light text-slate-500 dark:text-slate-400 mt-1">
          {activeTab === 'overview' && 'Track studio sales volume, live performance metrics, and inventory health.'}
          {activeTab === 'inventory' && 'Manage catalog objects, solid oak stock, pricing, and Scandinavian collection tags.'}
          {activeTab === 'orders' && 'Review incoming customer orders and white-glove fulfillment status.'}
          {activeTab === 'coupons' && 'Create and manage promotional discount codes and expiration dates.'}
          {activeTab === 'users' && 'Manage registered user accounts, administrator privileges, and credentials.'}
        </p>
      </div>

      <div className="editorial-card rounded-3xl shadow-sm border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-6 md:p-8 text-slate-900 dark:text-white">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'inventory' && <InventoryTab />}
        {activeTab === 'orders' && <OrdersTab />}
        {activeTab === 'coupons' && <CouponsTab />}
        {activeTab === 'users' && <UsersTab />}
      </div>
    </AdminLayout>
  );
};
