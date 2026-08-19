import { siteConfig } from '@/shared/config/site';

interface JsonLd {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

export function organizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    sameAs: [],
  };
}

export function webSiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export interface ProductJsonLdInput {
  name: string;
  description: string;
  image: string[];
  sku?: string;
  brand?: string;
  price: string;
  currency: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  url: string;
}

export function productJsonLd(product: ProductJsonLdInput): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    brand: product.brand ? { '@type': 'Brand', name: product.brand } : undefined,
    url: product.url,
    offers: {
      '@type': 'Offer',
      url: product.url,
      priceCurrency: product.currency,
      price: product.price,
      availability: `https://schema.org/${product.availability}`,
    },
  };
}
