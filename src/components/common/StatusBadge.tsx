import { Chip } from '@mui/material';
import type { UserStatus, DoctorStatus } from '../../types';

interface StatusBadgeProps {
  status: UserStatus | DoctorStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'ACTIVE':
        return {
          label: 'Active',
          bgcolor: '#4caf50', // Green
          color: '#ffffff',
        };
      case 'INACTIVE':
        return {
          label: 'Inactive',
          bgcolor: '#9e9e9e', // Gray
          color: '#ffffff',
        };
      case 'SUSPENDED':
        return {
          label: 'Suspended',
          bgcolor: '#f44336', // Red
          color: '#ffffff',
        };
      case 'PENDING':
        return {
          label: 'Pending',
          bgcolor: '#ff9800', // Orange
          color: '#ffffff',
        };
      case 'ON_LEAVE':
        return {
          label: 'On Leave',
          bgcolor: '#2196f3', // Blue
          color: '#ffffff',
        };
      default:
        return {
          label: status,
          bgcolor: '#757575', // Default Gray
          color: '#ffffff',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Chip
      label={config.label}
      size="small"
      sx={{
        fontWeight: 600,
        bgcolor: config.bgcolor,
        color: config.color,
        '&:hover': {
          bgcolor: config.bgcolor,
          opacity: 0.9,
        }
      }}
    />
  );
};

export default StatusBadge;

