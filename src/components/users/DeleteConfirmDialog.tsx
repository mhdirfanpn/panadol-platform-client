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
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';
import type { User } from '../../types';

interface DeleteConfirmDialogProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onConfirm: (userId: number) => Promise<void>;
}

const DeleteConfirmDialog = ({ open, user, onClose, onConfirm }: DeleteConfirmDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      await onConfirm(user.id);
      onClose();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to delete user');
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

  if (!user) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, fontSize: '1.5rem' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon color="error" />
          Delete User
        </Box>
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Typography variant="body1" gutterBottom>
          Are you sure you want to delete this user?
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
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Role: {user.role}
          </Typography>
        </Box>
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          This action cannot be undone.
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
          {loading ? 'Deleting...' : 'Delete User'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;

