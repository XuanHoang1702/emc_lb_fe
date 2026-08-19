import type { Metadata } from 'next';
import { HomePage } from './HomePage';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: 'Mua sắm trực tuyến sản phẩm chính hãng tại EMC E-Commerce.',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return <HomePage />;
}
