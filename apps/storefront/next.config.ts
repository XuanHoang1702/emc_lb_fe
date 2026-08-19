import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['@emc/api-client', '@emc/contracts', '@emc/ui', '@emc/utils'],
};

export default nextConfig;
