import { useState } from 'react';
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
} from '@mui/material';
import type { User, UserStatus } from '../../types';
import { UserStatus as UserStatusEnum } from '../../types';

interface UpdateStatusModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSubmit: (userId: number, status: UserStatus) => Promise<void>;
}

const UpdateStatusModal = ({ open, user, onClose, onSubmit }: UpdateStatusModalProps) => {
  const [status, setStatus] = useState<UserStatus>(user?.status || UserStatusEnum.ACTIVE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      await onSubmit(user.id, status);
      onClose();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to update status');
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
        Update User Status
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            User
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as UserStatus);
            setError(null);
          }}
          fullWidth
          disabled={loading}
        >
          <MenuItem value={UserStatusEnum.ACTIVE}>Active</MenuItem>
          <MenuItem value={UserStatusEnum.INACTIVE}>Inactive</MenuItem>
          <MenuItem value={UserStatusEnum.SUSPENDED}>Suspended</MenuItem>
          <MenuItem value={UserStatusEnum.PENDING}>Pending</MenuItem>
          <MenuItem value={UserStatusEnum.ON_LEAVE}>On Leave</MenuItem>
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

export default UpdateStatusModal;

