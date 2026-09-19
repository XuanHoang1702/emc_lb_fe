import { describe, expect, it } from 'vitest';
import { calculatePasswordStrength, registerSchema } from './registerSchema';

describe('registerSchema validation', () => {
  it('validates correct form data successfully', () => {
    const validData = {
      fullName: 'Nguyen Van A',
      email: 'nguyenvana@example.com',
      phone: '0912345678',
      accountType: 'personal' as const,
      password: 'Password123!',
      confirmPassword: 'Password123!',
      agreeTerms: true,
      newsletter: true,
    };

    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('fails when email is invalid', () => {
    const invalidData = {
      fullName: 'Nguyen Van A',
      email: 'invalid-email',
      phone: '0912345678',
      accountType: 'personal' as const,
      password: 'Password123!',
      confirmPassword: 'Password123!',
      agreeTerms: true,
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
    }
  });

  it('fails when passwords do not match', () => {
    const mismatchData = {
      fullName: 'Nguyen Van A',
      email: 'nguyenvana@example.com',
      phone: '0912345678',
      accountType: 'personal' as const,
      password: 'Password123!',
      confirmPassword: 'DifferentPassword123!',
      agreeTerms: true,
    };

    const result = registerSchema.safeParse(mismatchData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.confirmPassword).toContain(
        'Mật khẩu xác nhận không khớp với mật khẩu đã nhập',
      );
    }
  });

  it('fails when agreeTerms is false', () => {
    const noTermsData = {
      fullName: 'Nguyen Van A',
      email: 'nguyenvana@example.com',
      phone: '0912345678',
      accountType: 'personal' as const,
      password: 'Password123!',
      confirmPassword: 'Password123!',
      agreeTerms: false,
    };

    const result = registerSchema.safeParse(noTermsData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.agreeTerms).toBeDefined();
    }
  });
});

describe('calculatePasswordStrength', () => {
  it('calculates password strength correctly', () => {
    expect(calculatePasswordStrength('').score).toBe(0);
    expect(calculatePasswordStrength('12345678').score).toBe(2);
    expect(calculatePasswordStrength('Password123!').score).toBe(4);
    expect(calculatePasswordStrength('Password123!').percentage).toBe(100);
  });
});
