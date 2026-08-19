import { describe, it, expect } from 'vitest';
import { organizationJsonLd, webSiteJsonLd, productJsonLd, type ProductJsonLdInput } from './seo';
import { siteConfig } from '@/shared/config/site';

describe('organizationJsonLd', () => {
  it('returns a schema.org Organization entity', () => {
    const ld = organizationJsonLd();
    expect(ld['@context']).toBe('https://schema.org');
    expect(ld['@type']).toBe('Organization');
    expect(ld.name).toBe(siteConfig.name);
    expect(ld.url).toBe(siteConfig.url);
    expect(ld.logo).toBe(`${siteConfig.url}/icon.svg`);
    expect(ld.sameAs).toEqual([]);
  });
});

describe('webSiteJsonLd', () => {
  it('returns a WebSite entity with a SearchAction', () => {
    const ld = webSiteJsonLd();
    expect(ld['@type']).toBe('WebSite');
    expect(ld.name).toBe(siteConfig.name);
    expect(ld.url).toBe(siteConfig.url);

    const action = ld.potentialAction as Record<string, unknown>;
    expect(action['@type']).toBe('SearchAction');
    expect(action.target).toBe(`${siteConfig.url}/search?q={search_term_string}`);
    expect(action['query-input']).toBe('required name=search_term_string');
  });
});

describe('productJsonLd', () => {
  const product: ProductJsonLdInput = {
    name: 'Áo thun cotton',
    description: 'Áo thun chất liệu cotton cao cấp',
    image: ['https://cdn.example.com/a.jpg', 'https://cdn.example.com/b.jpg'],
    sku: 'TS-001',
    brand: 'EMC',
    price: '199000',
    currency: 'VND',
    availability: 'InStock',
    url: 'https://emc.example.com/products/ao-thun-cotton',
  };

  it('returns a Product entity with an Offer', () => {
    const ld = productJsonLd(product);
    expect(ld['@type']).toBe('Product');
    expect(ld.name).toBe(product.name);
    expect(ld.description).toBe(product.description);
    expect(ld.image).toEqual(product.image);
    expect(ld.sku).toBe('TS-001');

    const brand = ld.brand as { '@type': string; name: string };
    expect(brand['@type']).toBe('Brand');
    expect(brand.name).toBe('EMC');

    const offers = ld.offers as Record<string, unknown>;
    expect(offers['@type']).toBe('Offer');
    expect(offers.priceCurrency).toBe('VND');
    expect(offers.price).toBe('199000');
    expect(offers.availability).toBe('https://schema.org/InStock');
    expect(offers.url).toBe(product.url);
  });

  it('omits brand and sku when not provided', () => {
    const { brand: _brand, sku: _sku, ...rest } = product;
    const ld = productJsonLd(rest);
    expect(ld.brand).toBeUndefined();
    expect(ld.sku).toBeUndefined();
  });
});
