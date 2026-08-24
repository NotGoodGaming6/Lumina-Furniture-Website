import React from 'react';
import { Route } from 'react-router-dom';
import { Admin } from '@/pages/Admin/AdminPage';
import { AdminRoute } from '@/components/shared/AdminRoute';

export const AdminRouter = () => {
  return (
    <Route element={<AdminRoute />}>
      <Route path="/admin" element={<Admin />} />
    </Route>
  );
};
