import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HomePage } from '@/app/HomePage';
import { NotFoundPage } from '@/app/NotFoundPage';

describe('HomePage', () => {
  it('renders the home page heading and main sections', () => {
    render(<HomePage />);

    expect(screen.getAllByText(/EMC/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/BỘ SƯU TẬP THỜI TRANG ĐẲNG CẤP/i)).toBeInTheDocument();
  });
});

describe('NotFoundPage', () => {
  it('renders the not found page and a link back home', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Trang không tìm thấy')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Về trang chủ' })).toHaveAttribute('href', '/');
  });
});
