import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/home';
import { NotFoundPage } from '@/pages/not-found';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Add more routes here as pages are created */}
      {/* <Route path="/products" element={<ProductsPage />} /> */}
      {/* <Route path="/products/:id" element={<ProductDetailPage />} /> */}
      {/* <Route path="/cart" element={<CartPage />} /> */}
      {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
