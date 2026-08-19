export const env = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL ?? '/api',
  APP_TITLE: process.env.NEXT_PUBLIC_APP_TITLE ?? 'EMC E-Commerce',
  IS_DEV: process.env.NODE_ENV === 'development',
  IS_PROD: process.env.NODE_ENV === 'production',
} as const;
