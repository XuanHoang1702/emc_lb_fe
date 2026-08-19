import { ImageResponse } from 'next/og';
import { siteConfig } from '@/shared/config/site';

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
        color: '#ffffff',
        fontSize: 64,
        fontWeight: 700,
        fontFamily: 'Inter, Arial, sans-serif',
      }}
    >
      EMC E-Commerce
      <div style={{ fontSize: 28, color: '#bfdbfe', marginTop: 16 }}>
        Nền tảng thương mại điện tử
      </div>
    </div>,
    { ...size },
  );
}
