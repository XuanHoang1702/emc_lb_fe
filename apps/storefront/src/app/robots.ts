import type { MetadataRoute } from 'next';
import { siteConfig } from '@/shared/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout', '/account', '/api/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
