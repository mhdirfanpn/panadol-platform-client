import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage Component', () => {
  it('should render error message with provided text', () => {
    const errorText = 'Something went wrong!';
    render(<ErrorMessage message={errorText} />);
    expect(screen.getByText(errorText)).toBeInTheDocument();
  });

  it('should render error alert with error severity', () => {
    render(<ErrorMessage message="Error occurred" />);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('MuiAlert-standardError');
  });

  it('should render with error icon', () => {
    const { container } = render(<ErrorMessage message="Error" />);
    const icon = container.querySelector('.MuiAlert-icon');
    expect(icon).toBeInTheDocument();
  });

  it('should handle empty message', () => {
    render(<ErrorMessage message="" />);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });

  it('should handle long error messages', () => {
    const longMessage = 'This is a very long error message that should still be displayed correctly in the alert component without any issues';
    render(<ErrorMessage message={longMessage} />);
    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });
});

