import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { App } from './App';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('App', () => {
  it('renders the admin dashboard with layout and sidebar', () => {
    render(<App />);

    expect(screen.getByText('Voyagio')).toBeInTheDocument();
    expect(screen.getAllByText('Overview').length).toBeGreaterThan(0);
    expect(screen.getByText('TOTAL REVENUE')).toBeInTheDocument();
    expect(screen.getByText('$284,320')).toBeInTheDocument();
  });

  it('renders revenue chart, top products, orders and recent bookings', () => {
    render(<App />);

    expect(screen.getByText('Revenue by transport mode')).toBeInTheDocument();
    expect(screen.getByText('Popular routes')).toBeInTheDocument();
    expect(screen.getByText('Tickets sold by weekday')).toBeInTheDocument();
    expect(screen.getByText('Sales by transport mode')).toBeInTheDocument();
    expect(screen.getByText('Recent bookings')).toBeInTheDocument();
  });

  it('renders booking rows with customer names and statuses', () => {
    render(<App />);

    expect(screen.getByText('Elena Fischer')).toBeInTheDocument();
    expect(screen.getByText('Marcus Chen')).toBeInTheDocument();
    expect(screen.getByText('refunded')).toBeInTheDocument();
    expect(screen.getByText('TX-38412')).toBeInTheDocument();
  });

  it('opens and closes the mobile sidebar', () => {
    render(<App />);

    const openButton = screen.getByRole('button', { name: 'Open menu' });
    fireEvent.click(openButton);

    const closeButton = screen.getByRole('button', { name: 'Close Sidebar' });
    fireEvent.click(closeButton);

    expect(screen.getByText('Voyagio')).toBeInTheDocument();
  });
});
