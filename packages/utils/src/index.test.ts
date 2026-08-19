import { describe, it, expect } from 'vitest';
import { cn, formatCurrency, formatNumber } from './index';

describe('index barrel', () => {
  it('re-exports cn', () => {
    expect(cn('a', null, 'b')).toBe('a b');
  });

  it('re-exports formatCurrency', () => {
    expect(formatCurrency(1000, 'VND', 'vi-VN')).toContain('1.000');
  });

  it('re-exports formatNumber', () => {
    expect(formatNumber(1000)).toContain('1.000');
  });
});
