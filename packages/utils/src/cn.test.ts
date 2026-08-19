import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('joins truthy classes with a single space', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c');
  });

  it('filters out falsy values', () => {
    expect(cn('a', undefined, null, false, 'b')).toBe('a b');
  });

  it('returns empty string when nothing is passed', () => {
    expect(cn()).toBe('');
    expect(cn(false, null, undefined)).toBe('');
  });

  it('filters out empty strings too', () => {
    expect(cn('a', '', 'b')).toBe('a b');
  });
});
