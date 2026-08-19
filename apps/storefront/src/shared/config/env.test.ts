import { describe, it, expect } from 'vitest';
import { env } from './env';

describe('env', () => {
  it('provides default API base URL', () => {
    expect(env.API_BASE_URL).toBe('/api');
  });

  it('provides default app title', () => {
    expect(env.APP_TITLE).toBe('EMC E-Commerce');
  });

  it('exposes dev and prod flags', () => {
    expect(typeof env.IS_DEV).toBe('boolean');
    expect(typeof env.IS_PROD).toBe('boolean');
  });
});
