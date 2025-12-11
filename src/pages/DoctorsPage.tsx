import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { doctorService } from '../services/doctorService';
import type { Doctor, DoctorStatus, OnboardDoctorRequest } from '../types';
import { Specialization } from '../types';
import DoctorList from '../components/doctors/DoctorList';
import OnboardDoctorModal from '../components/doctors/OnboardDoctorModal';
import UpdateDoctorStatusModal from '../components/doctors/UpdateDoctorStatusModal';
import DeleteDoctorConfirmDialog from '../components/doctors/DeleteDoctorConfirmDialog';
import ViewDoctorModal from '../components/doctors/ViewDoctorModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState<string>('ALL');

  // Modal states
  const [onboardModalOpen, setOnboardModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await doctorService.getAllDoctors();
      setDoctors(data);
      setFilteredDoctors(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load doctors');
      console.error('Error fetching doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Filter doctors based on search and specialization
  useEffect(() => {
    let filtered = doctors;

    // Filter by specialization
    if (specializationFilter !== 'ALL') {
      filtered = filtered.filter((doctor) => doctor.specialization === specializationFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (doctor) =>
          doctor.firstName.toLowerCase().includes(term) ||
          doctor.lastName.toLowerCase().includes(term) ||
          doctor.email.toLowerCase().includes(term) ||
          doctor.licenseNumber.toLowerCase().includes(term)
      );
    }

    setFilteredDoctors(filtered);
  }, [searchTerm, specializationFilter, doctors]);

  const handleOnboardDoctor = async (doctorData: OnboardDoctorRequest) => {
    await doctorService.onboardDoctor(doctorData);
    await fetchDoctors();
  };

  const handleUpdateStatus = async (doctorId: number, status: DoctorStatus) => {
    await doctorService.updateDoctorStatus(doctorId, status);
    await fetchDoctors();
  };

  const handleDeleteDoctor = async (doctorId: number) => {
    await doctorService.deleteDoctor(doctorId);
    await fetchDoctors();
  };

  const handleEdit = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setUpdateModalOpen(true);
  };

  const handleDelete = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setDeleteDialogOpen(true);
  };

  const handleView = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setViewModalOpen(true);
  };

  if (loading) {
    return <LoadingSpinner message="Loading doctors..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchDoctors} />;
  }

  return (
    <Box>
      {/* Header */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Doctor Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage all doctors in the system
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOnboardModalOpen(true)}
            >
              Onboard Doctor
            </Button>
          </Box>
        </Box>

        {/* Search and Filter */}
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <TextField
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flex: 1 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            select
            label="Filter by Specialization"
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
            sx={{ minWidth: 250 }}
          >
            <MenuItem value="ALL">All Specializations</MenuItem>
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
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Total Doctors
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              {doctors.length}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Filtered Results
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              {filteredDoctors.length}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Active Doctors
            </Typography>
            <Typography variant="h5" fontWeight={700} color="success.main">
              {doctors.filter(d => d.status === 'ACTIVE').length}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Doctor List */}
      <DoctorList
        doctors={filteredDoctors}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {/* Modals */}
      <OnboardDoctorModal
        open={onboardModalOpen}
        onClose={() => setOnboardModalOpen(false)}
        onSubmit={handleOnboardDoctor}
      />

      <UpdateDoctorStatusModal
        open={updateModalOpen}
        doctor={selectedDoctor}
        onClose={() => {
          setUpdateModalOpen(false);
          setSelectedDoctor(null);
        }}
        onSubmit={handleUpdateStatus}
      />

      <DeleteDoctorConfirmDialog
        open={deleteDialogOpen}
        doctor={selectedDoctor}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedDoctor(null);
        }}
        onConfirm={handleDeleteDoctor}
      />

      <ViewDoctorModal
        open={viewModalOpen}
        doctor={selectedDoctor}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedDoctor(null);
        }}
      />
    </Box>
  );
};

export default DoctorsPage;


