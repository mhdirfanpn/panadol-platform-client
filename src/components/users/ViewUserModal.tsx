import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Chip,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  Badge as BadgeIcon,
  CalendarToday as CalendarIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import type { User } from '../../types';
import StatusBadge from '../common/StatusBadge';

interface ViewUserModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const InfoRow = ({ icon, label, value }: InfoRowProps) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
    <Box sx={{ color: '#64748b', display: 'flex', alignItems: 'center' }}>
      {icon}
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={500}>
        {value}
      </Typography>
    </Box>
  </Box>
);

const ViewUserModal = ({ open, user, onClose }: ViewUserModalProps) => {
  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, fontSize: '1.5rem', pb: 1 }}>
        User Details
      </DialogTitle>
      <DialogContent>
        {/* Header Section */}
        <Box sx={{ mb: 3, mt: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
            <Box>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                {user.firstName} {user.lastName}
              </Typography>
              <Chip
                label={user.role.replace(/_/g, ' ')}
                sx={{
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              />
            </Box>
            <StatusBadge status={user.status} />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Contact Information */}
        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
          Contact Information
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <InfoRow icon={<EmailIcon />} label="Email" value={user.email} />
          <InfoRow icon={<PhoneIcon />} label="Phone Number" value={user.phoneNumber || 'N/A'} />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Account Information */}
        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
          Account Information
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <InfoRow icon={<PersonIcon />} label="Username" value={user.username} />
          <InfoRow icon={<BadgeIcon />} label="User ID" value={user.id} />
          <InfoRow 
            icon={<CalendarIcon />} 
            label="Created At" 
            value={new Date(user.createdAt).toLocaleDateString()} 
          />
          <InfoRow 
            icon={<LoginIcon />} 
            label="Last Login" 
            value={user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'} 
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewUserModal;

