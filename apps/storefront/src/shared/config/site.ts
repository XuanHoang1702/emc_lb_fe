export const siteConfig = {
  name: 'EMC E-Commerce',
  title: 'EMC E-Commerce',
  description: 'Nền tảng thương mại điện tử với đa dạng sản phẩm chính hãng.',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://emc.example.com').replace(/\/$/, ''),
  locale: 'vi_VN',
  defaultLanguage: 'vi',
  keywords: ['thương mại điện tử', 'mua sắm online', 'EMC', 'e-commerce'],
} as const;
