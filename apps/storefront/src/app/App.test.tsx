import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HomePage } from '@/app/HomePage';
import { NotFoundPage } from '@/app/NotFoundPage';

describe('HomePage', () => {
  it('renders the home page heading', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { name: 'EMC E-Commerce' })).toBeInTheDocument();
    expect(screen.getByText('React 19')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
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
