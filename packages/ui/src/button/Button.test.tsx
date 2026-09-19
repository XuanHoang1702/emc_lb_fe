import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Button } from './Button';

describe('Button Component', () => {
  test('renders children text correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('applies variant and size classes correctly', () => {
    const { rerender } = render(
      <Button variant="danger" size="lg">
        Delete
      </Button>,
    );
    const button = screen.getByRole('button', { name: /delete/i });
    expect(button).toHaveClass('bg-error-500');
    expect(button).toHaveClass('px-6');

    rerender(
      <Button variant="secondary" size="sm">
        Cancel
      </Button>,
    );
    const updatedButton = screen.getByRole('button', { name: /cancel/i });
    expect(updatedButton).toHaveClass('bg-secondary-100');
    expect(updatedButton).toHaveClass('px-3');
  });

  test('handles click events when enabled', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit</Button>);
    const button = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('prevents click events when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Submit
      </Button>,
    );
    const button = screen.getByRole('button', { name: /submit/i });

    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  describe('Loading State & Accessibility (Regression Checks)', () => {
    test('renders loading spinner and sets aria-busy when isLoading is true', () => {
      render(<Button isLoading>Saving...</Button>);
      const button = screen.getByRole('button', { name: /saving.../i });

      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'true');

      const svgSpinner = button.querySelector('svg');
      expect(svgSpinner).toBeInTheDocument();
      expect(svgSpinner).toHaveAttribute('aria-hidden', 'true');
    });

    test('prevents click events when isLoading is true', () => {
      const handleClick = vi.fn();
      render(
        <Button isLoading onClick={handleClick}>
          Loading
        </Button>,
      );
      const button = screen.getByRole('button');

      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
