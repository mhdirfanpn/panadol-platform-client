import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import type { Doctor, DoctorStatus } from '../../types';
import { DoctorStatus as DoctorStatusEnum } from '../../types';

interface UpdateDoctorStatusModalProps {
  open: boolean;
  doctor: Doctor | null;
  onClose: () => void;
  onSubmit: (doctorId: number, status: DoctorStatus) => Promise<void>;
}

const UpdateDoctorStatusModal = ({ open, doctor, onClose, onSubmit }: UpdateDoctorStatusModalProps) => {
  const [status, setStatus] = useState<DoctorStatus>(DoctorStatusEnum.ACTIVE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update status when doctor changes
  useEffect(() => {
    if (doctor?.status) {
      setStatus(doctor.status);
    }
  }, [doctor]);

  const handleSubmit = async () => {
    if (!doctor) return;

    try {
      setLoading(true);
      setError(null);
      await onSubmit(doctor.id, status);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError(null);
      onClose();
    }
  };

  if (!doctor) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, fontSize: '1.5rem' }}>
        Update Doctor Status
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Doctor
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            {doctor.firstName} {doctor.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {doctor.email}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Chip
              label={doctor.specialization}
              size="small"
              sx={{
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                fontWeight: 600,
              }}
            />
          </Box>
        </Box>
        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as DoctorStatus);
            setError(null);
          }}
          fullWidth
          disabled={loading}
        >
          <MenuItem value={DoctorStatusEnum.ACTIVE}>Active</MenuItem>
          <MenuItem value={DoctorStatusEnum.INACTIVE}>Inactive</MenuItem>
          <MenuItem value={DoctorStatusEnum.SUSPENDED}>Suspended</MenuItem>
          <MenuItem value={DoctorStatusEnum.PENDING}>Pending</MenuItem>
          <MenuItem value={DoctorStatusEnum.ON_LEAVE}>On Leave</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? 'Updating...' : 'Update Status'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateDoctorStatusModal;

