import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteConfirmDialog from '../DeleteConfirmDialog';

describe('DeleteConfirmDialog Component', () => {
  const mockUser = {
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
  };

  it('should not render when open is false', () => {
    render(
      <DeleteConfirmDialog
        open={false}
        user={mockUser}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render when open is true', () => {
    render(
      <DeleteConfirmDialog
        open={true}
        user={mockUser}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should display user name in confirmation message', () => {
    render(
      <DeleteConfirmDialog
        open={true}
        user={mockUser}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />
    );

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });

  it('should call onClose when Cancel button is clicked', async () => {
    const user = userEvent.setup();
    const onCloseMock = vi.fn();

    render(
      <DeleteConfirmDialog
        open={true}
        user={mockUser}
        onClose={onCloseMock}
        onConfirm={vi.fn()}
      />
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should call onConfirm when Delete button is clicked', async () => {
    const user = userEvent.setup();
    const onConfirmMock = vi.fn();

    render(
      <DeleteConfirmDialog
        open={true}
        user={mockUser}
        onClose={vi.fn()}
        onConfirm={onConfirmMock}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });

  it('should render delete confirmation message', () => {
    render(
      <DeleteConfirmDialog
        open={true}
        user={mockUser}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />
    );

    expect(screen.getByText('Are you sure you want to delete this user?')).toBeInTheDocument();
  });

  it('should have Delete button with error color', () => {
    render(
      <DeleteConfirmDialog
        open={true}
        user={mockUser}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(deleteButton).toHaveClass('MuiButton-colorError');
  });
});

