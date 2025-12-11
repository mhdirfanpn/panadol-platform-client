import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import type { Doctor } from '../../types';
import StatusBadge from '../common/StatusBadge';

interface DoctorListProps {
  doctors: Doctor[];
  onEdit: (doctor: Doctor) => void;
  onDelete: (doctor: Doctor) => void;
  onView: (doctor: Doctor) => void;
}

const DoctorList = ({ doctors, onEdit, onDelete, onView }: DoctorListProps) => {
  if (doctors.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          No doctors found
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e2e8f0' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f8fafc' }}>
            <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Specialization</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>License Number</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Experience</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow
              key={doctor.id}
              sx={{
                '&:hover': { backgroundColor: '#f8fafc' },
                transition: 'background-color 0.2s',
              }}
            >
              <TableCell>{doctor.id}</TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight={600}>
                  {doctor.firstName} {doctor.lastName}
                </Typography>
              </TableCell>
              <TableCell>{doctor.email}</TableCell>
              <TableCell>{doctor.phoneNumber || '-'}</TableCell>
              <TableCell>
                <Chip
                  label={doctor.specialization}
                  size="small"
                  sx={{
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                  }}
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  {doctor.licenseNumber}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {doctor.experienceYears} {doctor.experienceYears === 1 ? 'year' : 'years'}
                </Typography>
              </TableCell>
              <TableCell>
                <StatusBadge status={doctor.status} />
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                  <Tooltip title="View Details">
                    <IconButton size="small" color="info" onClick={() => onView(doctor)}>
                      <ViewIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Status">
                    <IconButton size="small" color="primary" onClick={() => onEdit(doctor)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Doctor">
                    <IconButton size="small" color="error" onClick={() => onDelete(doctor)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DoctorList;

