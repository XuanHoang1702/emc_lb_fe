import { z } from 'zod';

export const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, { message: 'Họ và tên phải có ít nhất 2 ký tự' })
      .max(100, { message: 'Họ và tên không vượt quá 100 ký tự' }),
    email: z
      .string()
      .trim()
      .min(1, { message: 'Vui lòng nhập địa chỉ Email' })
      .email({ message: 'Địa chỉ Email không hợp lệ' }),
    phone: z
      .string()
      .trim()
      .min(1, { message: 'Vui lòng nhập số điện thoại' })
      .regex(phoneRegex, { message: 'Số điện thoại không hợp lệ (VD: 0912345678)' }),
    accountType: z.enum(['personal', 'business'], {
      required_error: 'Vui lòng chọn loại tài khoản',
    }),
    password: z
      .string()
      .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
      .regex(/[A-Z]/, { message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa' })
      .regex(/[a-z]/, { message: 'Mật khẩu phải chứa ít nhất 1 chữ thường' })
      .regex(/[0-9]/, { message: 'Mật khẩu phải chứa ít nhất 1 chữ số' })
      .regex(/[^A-Za-z0-9]/, { message: 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt' }),
    confirmPassword: z.string().min(1, { message: 'Vui lòng xác nhận mật khẩu' }),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: 'Bạn cần đồng ý với Điều khoản dịch vụ & Chính sách bảo mật',
    }),
    newsletter: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp với mật khẩu đã nhập',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export interface PasswordRequirement {
  id: string;
  label: string;
  test: (pw: string) => boolean;
}

export const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
  { id: 'minLen', label: 'Ít nhất 8 ký tự', test: (pw) => pw.length >= 8 },
  { id: 'uppercase', label: 'Có chữ cái viết hoa (A-Z)', test: (pw) => /[A-Z]/.test(pw) },
  { id: 'lowercase', label: 'Có chữ cái viết thường (a-z)', test: (pw) => /[a-z]/.test(pw) },
  { id: 'number', label: 'Có chữ số (0-9)', test: (pw) => /[0-9]/.test(pw) },
  { id: 'special', label: 'Có ký tự đặc biệt (!@#$%...)', test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

export function calculatePasswordStrength(password: string): {
  score: number; // 0 to 4
  label: string;
  colorClass: string;
  percentage: number;
} {
  if (!password) {
    return { score: 0, label: 'Chưa nhập', colorClass: 'bg-gray-200', percentage: 0 };
  }

  const passedCount = PASSWORD_REQUIREMENTS.filter((req) => req.test(password)).length;

  if (passedCount <= 1) {
    return { score: 1, label: 'Rất yếu', colorClass: 'bg-red-500', percentage: 25 };
  }
  if (passedCount <= 3) {
    return { score: 2, label: 'Trung bình', colorClass: 'bg-amber-500', percentage: 50 };
  }
  if (passedCount === 4) {
    return { score: 3, label: 'Mạnh', colorClass: 'bg-blue-500', percentage: 75 };
  }
  return { score: 4, label: 'Rất an toàn', colorClass: 'bg-emerald-500', percentage: 100 };
}
