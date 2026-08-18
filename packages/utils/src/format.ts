/**
 * Format a number as currency
 */
export function formatCurrency(
  amount: number,
  currency = 'VND',
  locale = 'vi-VN',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format a number with locale-aware separators
 */
export function formatNumber(value: number, locale = 'vi-VN'): string {
  return new Intl.NumberFormat(locale).format(value);
}
