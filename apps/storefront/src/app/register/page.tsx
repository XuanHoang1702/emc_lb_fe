import type { Metadata } from 'next';
import { RegisterClientPage } from './RegisterClientPage';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = {
  title: 'Đăng Ký Tài Khoản Thành Viên',
  description:
    'Đăng ký tài khoản EMC E-Commerce ngay để nhận Voucher 500.000đ, miễn phí giao hàng 2H và tích điểm 5% cho mọi đơn hàng.',
  alternates: {
    canonical: `${siteConfig.url}/register`,
  },
  openGraph: {
    title: 'Đăng Ký Tài Khoản Thành Viên | EMC E-Commerce',
    description:
      'Đăng ký tài khoản EMC E-Commerce ngay để nhận Voucher 500.000đ và ưu đãi độc quyền.',
    url: `${siteConfig.url}/register`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
};

export default function RegisterPage() {
  const registerWebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Đăng Ký Tài Khoản Thành Viên | EMC E-Commerce',
    description: 'Trang đăng ký tài khoản thành viên EMC E-Commerce với nhiều ưu đãi độc quyền.',
    url: `${siteConfig.url}/register`,
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(registerWebPageJsonLd) }}
      />
      <RegisterClientPage />
    </>
  );
}
