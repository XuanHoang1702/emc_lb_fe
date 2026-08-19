import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Providers } from './Providers';
import { QueryProvider } from './QueryProvider';

describe('Providers', () => {
  it('renders children through the provider stack', () => {
    render(
      <Providers>
        <div>content</div>
      </Providers>,
    );
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});

describe('QueryProvider', () => {
  it('renders children inside a QueryClientProvider', () => {
    render(
      <QueryProvider>
        <div>query content</div>
      </QueryProvider>,
    );
    expect(screen.getByText('query content')).toBeInTheDocument();
  });
});
