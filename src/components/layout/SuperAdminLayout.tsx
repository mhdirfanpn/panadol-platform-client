import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Header from './Header';

const SuperAdminLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Navigation />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Toolbar /> {/* Spacer for fixed header */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default SuperAdminLayout;

