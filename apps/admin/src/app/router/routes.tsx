import { Routes, Route } from 'react-router-dom';
import { AdminLayout } from '@/widgets/layout';
import { DashboardPage } from '@/pages/dashboard';

export function AppRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        {/* Add more admin routes here */}
        {/* <Route path="/products" element={<ProductManagementPage />} /> */}
        {/* <Route path="/orders" element={<OrderManagementPage />} /> */}
        {/* <Route path="/users" element={<UserManagementPage />} /> */}
      </Routes>
    </AdminLayout>
  );
}
