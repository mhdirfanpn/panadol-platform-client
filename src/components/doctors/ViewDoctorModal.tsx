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
  Badge as BadgeIcon,
  Work as WorkIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import type { Doctor } from '../../types';
import StatusBadge from '../common/StatusBadge';

interface ViewDoctorModalProps {
  open: boolean;
  doctor: Doctor | null;
  onClose: () => void;
}

const ViewDoctorModal = ({ open, doctor, onClose }: ViewDoctorModalProps) => {
  if (!doctor) return null;

  const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) => (
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, fontSize: '1.5rem', pb: 1 }}>
        Doctor Details
      </DialogTitle>
      <DialogContent>
        {/* Header Section */}
        <Box sx={{ mb: 3, mt: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
            <Box>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Dr. {doctor.firstName} {doctor.lastName}
              </Typography>
              <Chip
                label={doctor.specialization.replace(/_/g, ' ')}
                sx={{
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              />
            </Box>
            <StatusBadge status={doctor.status} />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Contact Information */}
        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
          Contact Information
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <InfoRow icon={<EmailIcon />} label="Email" value={doctor.email} />
          <InfoRow icon={<PhoneIcon />} label="Phone Number" value={doctor.phoneNumber || 'N/A'} />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Professional Information */}
        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
          Professional Information
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <InfoRow icon={<BadgeIcon />} label="License Number" value={doctor.licenseNumber} />
          <InfoRow
            icon={<WorkIcon />}
            label="Experience"
            value={`${doctor.experienceYears} ${doctor.experienceYears === 1 ? 'year' : 'years'}`}
          />
          <InfoRow icon={<MoneyIcon />} label="Consultation Fee" value={`$${doctor.consultationFee.toFixed(2)}`} />
          <InfoRow
            icon={<CalendarIcon />}
            label="Joined"
            value={new Date(doctor.createdAt).toLocaleDateString()}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Qualifications */}
        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 1 }}>
          Qualifications
        </Typography>
        <Box sx={{ py: 1.5, px: 2, backgroundColor: '#f8fafc', borderRadius: 1 }}>
          <Typography variant="body1">{doctor.qualifications}</Typography>
        </Box>

        {/* Bio */}
        {doctor.bio && (
          <>
            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 1, mt: 3 }}>
              Biography
            </Typography>
            <Box sx={{ py: 1.5, px: 2, backgroundColor: '#f8fafc', borderRadius: 1 }}>
              <Typography variant="body1">{doctor.bio}</Typography>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewDoctorModal;

