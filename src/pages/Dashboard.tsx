import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
} from '@mui/material';
import {
  People as PeopleIcon,
  LocalHospital as DoctorIcon,
  PersonAdd as PatientIcon,
  CheckCircle as ActiveIcon,
  HourglassEmpty as PendingIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import { dashboardService } from '../services/dashboardService';
import type { DashboardStats } from '../types';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 2,
        border: '1px solid #e2e8f0',
        transition: 'all 0.3s',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h3" fontWeight={700} color={color}>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: `${color}15`,
              borderRadius: 2,
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardService.getStats();
      setStats(data);
    } catch (err) {
      setError('Failed to load dashboard statistics. Please try again.');
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchStats} />;
  }

  if (!stats) {
    return <ErrorMessage message="No data available" />;
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <GroupIcon sx={{ fontSize: 40, color: '#3b82f6' }} />,
      color: '#3b82f6',
    },
    {
      title: 'Total Doctors',
      value: stats.totalDoctors,
      icon: <DoctorIcon sx={{ fontSize: 40, color: '#10b981' }} />,
      color: '#10b981',
    },
    {
      title: 'Total Patients',
      value: stats.totalPatients,
      icon: <PatientIcon sx={{ fontSize: 40, color: '#8b5cf6' }} />,
      color: '#8b5cf6',
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: <ActiveIcon sx={{ fontSize: 40, color: '#06b6d4' }} />,
      color: '#06b6d4',
    },
    {
      title: 'Active Doctors',
      value: stats.activeDoctors,
      icon: <PeopleIcon sx={{ fontSize: 40, color: '#f59e0b' }} />,
      color: '#f59e0b',
    },
    {
      title: 'Pending Users',
      value: stats.pendingUsers,
      icon: <PendingIcon sx={{ fontSize: 40, color: '#ef4444' }} />,
      color: '#ef4444',
    },
  ];

  return (
    <Box>
      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to the Super Admin Dashboard. Here's an overview of your system.
        </Typography>
      </Paper>

      {/* Top Row - 3 Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
          mb: 3,
        }}
      >
        {statCards.slice(0, 3).map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </Box>

      {/* Bottom Row - 3 Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
        }}
      >
        {statCards.slice(3, 6).map((card, index) => (
          <StatCard key={index + 3} {...card} />
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;

