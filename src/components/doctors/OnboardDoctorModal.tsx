import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import type { OnboardDoctorRequest } from '../../types';
import { Specialization } from '../../types';

interface OnboardDoctorModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (doctorData: OnboardDoctorRequest) => Promise<void>;
}

const OnboardDoctorModal = ({ open, onClose, onSubmit }: OnboardDoctorModalProps) => {
  const [formData, setFormData] = useState<OnboardDoctorRequest>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    phoneNumber: '',
    specialization: Specialization.GENERAL_PHYSICIAN,
    licenseNumber: '',
    experienceYears: 0,
    qualifications: '',
    bio: '',
    consultationFee: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email ||
        !formData.username || !formData.password || !formData.phoneNumber ||
        !formData.licenseNumber || !formData.qualifications) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.experienceYears < 0) {
      setError('Years of experience cannot be negative');
      return;
    }

    if (formData.consultationFee < 0) {
      setError('Consultation fee cannot be negative');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onSubmit(formData);
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        phoneNumber: '',
        specialization: Specialization.GENERAL_PHYSICIAN,
        licenseNumber: '',
        experienceYears: 0,
        qualifications: '',
        bio: '',
        consultationFee: 0,
      });
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to onboard doctor');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        phoneNumber: '',
        specialization: Specialization.GENERAL_PHYSICIAN,
        licenseNumber: '',
        experienceYears: 0,
        qualifications: '',
        bio: '',
        consultationFee: 0,
      });
      setError(null);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, fontSize: '1.5rem' }}>
        Onboard New Doctor
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {/* Personal Information */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="First Name"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              fullWidth
              required
              disabled={loading}
            />
            <TextField
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              fullWidth
              required
              disabled={loading}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              fullWidth
              required
              disabled={loading}
            />
            <TextField
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              fullWidth
              required
              disabled={loading}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Username"
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              fullWidth
              required
              disabled={loading}
            />
            <TextField
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              fullWidth
              required
              disabled={loading}
            />
          </Box>

          {/* Professional Information */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              select
              label="Specialization"
              value={formData.specialization}
              onChange={(e) => handleChange('specialization', e.target.value)}
              fullWidth
              required
              disabled={loading}
            >
              <MenuItem value={Specialization.GENERAL_PHYSICIAN}>General Physician</MenuItem>
              <MenuItem value={Specialization.CARDIOLOGIST}>Cardiologist</MenuItem>
              <MenuItem value={Specialization.DERMATOLOGIST}>Dermatologist</MenuItem>
              <MenuItem value={Specialization.PEDIATRICIAN}>Pediatrician</MenuItem>
              <MenuItem value={Specialization.ORTHOPEDIC}>Orthopedic</MenuItem>
              <MenuItem value={Specialization.NEUROLOGIST}>Neurologist</MenuItem>
              <MenuItem value={Specialization.PSYCHIATRIST}>Psychiatrist</MenuItem>
              <MenuItem value={Specialization.GYNECOLOGIST}>Gynecologist</MenuItem>
              <MenuItem value={Specialization.OPHTHALMOLOGIST}>Ophthalmologist</MenuItem>
              <MenuItem value={Specialization.ENT_SPECIALIST}>ENT Specialist</MenuItem>
              <MenuItem value={Specialization.DENTIST}>Dentist</MenuItem>
              <MenuItem value={Specialization.RADIOLOGIST}>Radiologist</MenuItem>
              <MenuItem value={Specialization.ANESTHESIOLOGIST}>Anesthesiologist</MenuItem>
              <MenuItem value={Specialization.SURGEON}>Surgeon</MenuItem>
            </TextField>
            <TextField
              label="License Number"
              value={formData.licenseNumber}
              onChange={(e) => handleChange('licenseNumber', e.target.value)}
              fullWidth
              required
              disabled={loading}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Years of Experience"
              type="number"
              value={formData.experienceYears}
              onChange={(e) => handleChange('experienceYears', parseInt(e.target.value) || 0)}
              fullWidth
              required
              disabled={loading}
              slotProps={{ htmlInput: { min: 0 } }}
            />
            <TextField
              label="Consultation Fee"
              type="number"
              value={formData.consultationFee}
              onChange={(e) => handleChange('consultationFee', parseFloat(e.target.value) || 0)}
              fullWidth
              required
              disabled={loading}
              slotProps={{ htmlInput: { min: 0, step: 0.01 } }}
            />
          </Box>
          <TextField
            label="Qualifications"
            value={formData.qualifications}
            onChange={(e) => handleChange('qualifications', e.target.value)}
            fullWidth
            required
            disabled={loading}
            multiline
            rows={2}
            placeholder="e.g., MBBS, MD, Fellowship in Cardiology"
          />
          <TextField
            label="Bio"
            value={formData.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            fullWidth
            disabled={loading}
            multiline
            rows={2}
            placeholder="Brief professional biography (optional)"
          />
        </Box>
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
          {loading ? 'Onboarding...' : 'Onboard Doctor'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OnboardDoctorModal;

