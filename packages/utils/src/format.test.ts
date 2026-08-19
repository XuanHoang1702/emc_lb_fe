import { describe, it, expect } from 'vitest';
import { formatCurrency, formatNumber } from './format';

describe('formatCurrency', () => {
  it('formats with VND and vi-VN locale by default', () => {
    expect(formatCurrency(1234567)).toContain('1.234.567');
  });

  it('supports custom currency and locale', () => {
    const result = formatCurrency(284320, 'USD', 'en-US');
    expect(result).toContain('284,320');
  });

  it('handles zero and negative amounts', () => {
    expect(formatCurrency(0)).toContain('0');
    expect(formatCurrency(-1000)).toContain('1.000');
  });

  it('handles decimal amounts', () => {
    const result = formatCurrency(153.75, 'USD', 'en-US');
    expect(result).toContain('153.75');
  });
});

describe('formatNumber', () => {
  it('formats with vi-VN locale separators', () => {
    expect(formatNumber(1234567)).toContain('1.234.567');
  });

  it('supports custom locale', () => {
    expect(formatNumber(1234567, 'en-US')).toContain('1,234,567');
  });

  it('handles zero', () => {
    expect(formatNumber(0)).toBe('0');
  });
});
