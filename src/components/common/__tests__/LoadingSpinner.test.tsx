import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner Component', () => {
  it('should render loading spinner', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });

  it('should center the spinner in a box', () => {
    const { container } = render(<LoadingSpinner />);
    const box = container.querySelector('.MuiBox-root');
    expect(box).toBeInTheDocument();
  });

  it('should render CircularProgress component', () => {
    render(<LoadingSpinner />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveClass('MuiCircularProgress-root');
  });
});

