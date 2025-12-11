import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';
import type { Doctor } from '../../types';

interface DeleteDoctorConfirmDialogProps {
  open: boolean;
  doctor: Doctor | null;
  onClose: () => void;
  onConfirm: (doctorId: number) => Promise<void>;
}

const DeleteDoctorConfirmDialog = ({ open, doctor, onClose, onConfirm }: DeleteDoctorConfirmDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!doctor) return;

    try {
      setLoading(true);
      setError(null);
      await onConfirm(doctor.id);
      onClose();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to delete doctor');
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon color="error" />
          Delete Doctor
        </Box>
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Typography variant="body1" gutterBottom>
          Are you sure you want to delete this doctor?
        </Typography>
        <Box
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: '#fef2f2',
            borderRadius: 1,
            border: '1px solid #fecaca',
          }}
        >
          <Typography variant="body2" fontWeight={600} gutterBottom>
            {doctor.firstName} {doctor.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {doctor.email}
          </Typography>
          <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label={doctor.specialization}
              size="small"
              sx={{
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                fontWeight: 600,
              }}
            />
            <Chip
              label={`License: ${doctor.licenseNumber}`}
              size="small"
              variant="outlined"
            />
          </Box>
        </Box>
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          This action cannot be undone. All associated appointments and records will be affected.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="error"
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? 'Deleting...' : 'Delete Doctor'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDoctorConfirmDialog;

