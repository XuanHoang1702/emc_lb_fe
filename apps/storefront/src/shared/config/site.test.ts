import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

async function loadSiteConfig() {
  vi.resetModules();
  const { siteConfig } = await import('./site');
  return siteConfig;
}

describe('siteConfig', () => {
  const originalUrl = process.env.NEXT_PUBLIC_SITE_URL;

  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    if (originalUrl === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalUrl;
    }
    vi.unstubAllEnvs();
  });

  it('falls back to the default site URL', async () => {
    const siteConfig = await loadSiteConfig();
    expect(siteConfig.url).toBe('https://emc.example.com');
  });

  it('exposes the expected brand and locale metadata', async () => {
    const siteConfig = await loadSiteConfig();
    expect(siteConfig.name).toBe('EMC E-Commerce');
    expect(siteConfig.locale).toBe('vi_VN');
    expect(siteConfig.defaultLanguage).toBe('vi');
  });

  it('strips a trailing slash from the configured URL', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://shop.example.com/');
    const siteConfig = await loadSiteConfig();
    expect(siteConfig.url).toBe('https://shop.example.com');
  });
});
