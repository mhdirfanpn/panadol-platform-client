import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusBadge from '../StatusBadge';
import { UserStatus, DoctorStatus } from '../../../types';

describe('StatusBadge Component', () => {
  describe('User Status', () => {
    it('should render ACTIVE status with success color', () => {
      render(<StatusBadge status={UserStatus.ACTIVE} />);
      const badge = screen.getByText('Active');
      expect(badge).toBeInTheDocument();
    });

    it('should render INACTIVE status with default color', () => {
      render(<StatusBadge status={UserStatus.INACTIVE} />);
      const badge = screen.getByText('Inactive');
      expect(badge).toBeInTheDocument();
    });

    it('should render SUSPENDED status with error color', () => {
      render(<StatusBadge status={UserStatus.SUSPENDED} />);
      const badge = screen.getByText('Suspended');
      expect(badge).toBeInTheDocument();
    });

    it('should render PENDING status with warning color', () => {
      render(<StatusBadge status={UserStatus.PENDING} />);
      const badge = screen.getByText('Pending');
      expect(badge).toBeInTheDocument();
    });
  });

  describe('Doctor Status', () => {
    it('should render ACTIVE doctor status', () => {
      render(<StatusBadge status={DoctorStatus.ACTIVE} />);
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('should render ON_LEAVE status with info color', () => {
      render(<StatusBadge status={DoctorStatus.ON_LEAVE} />);
      expect(screen.getByText('On Leave')).toBeInTheDocument();
    });

    it('should render SUSPENDED doctor status', () => {
      render(<StatusBadge status={DoctorStatus.SUSPENDED} />);
      expect(screen.getByText('Suspended')).toBeInTheDocument();
    });

    it('should render PENDING doctor status', () => {
      render(<StatusBadge status={DoctorStatus.PENDING} />);
      expect(screen.getByText('Pending')).toBeInTheDocument();
    });
  });

  describe('Status Label Formatting', () => {
    it('should format ON_LEAVE to "On Leave"', () => {
      render(<StatusBadge status={DoctorStatus.ON_LEAVE} />);
      expect(screen.getByText('On Leave')).toBeInTheDocument();
    });

    it('should capitalize first letter of status', () => {
      render(<StatusBadge status={UserStatus.ACTIVE} />);
      expect(screen.getByText('Active')).toBeInTheDocument();
    });
  });

  describe('Badge Styling', () => {
    it('should render as a small chip', () => {
      const { container } = render(<StatusBadge status={UserStatus.ACTIVE} />);
      expect(screen.getByText('Active')).toBeInTheDocument();
      const chip = container.querySelector('.MuiChip-sizeSmall');
      expect(chip).toBeInTheDocument();
    });
  });
});

