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
import { userService } from '../services/userService';
import type { User, UserStatus, CreateUserRequest } from '../types';
import { UserRole as UserRoleEnum } from '../types';
import UserList from '../components/users/UserList';
import CreateUserModal from '../components/users/CreateUserModal';
import UpdateStatusModal from '../components/users/UpdateStatusModal';
import DeleteConfirmDialog from '../components/users/DeleteConfirmDialog';
import ViewUserModal from '../components/users/ViewUserModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAllUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to load users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search and role
  useEffect(() => {
    let filtered = users;

    // Filter by role
    if (roleFilter !== 'ALL') {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.firstName.toLowerCase().includes(term) ||
          user.lastName.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.username.toLowerCase().includes(term)
      );
    }

    setFilteredUsers(filtered);
  }, [searchTerm, roleFilter, users]);

  const handleCreateUser = async (userData: CreateUserRequest) => {
    await userService.createUser(userData);
    await fetchUsers();
  };

  const handleUpdateStatus = async (userId: number, status: UserStatus) => {
    await userService.updateUserStatus(userId, status);
    await fetchUsers();
  };

  const handleDeleteUser = async (userId: number) => {
    await userService.deleteUser(userId);
    await fetchUsers();
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setUpdateModalOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  if (loading) {
    return <LoadingSpinner message="Loading users..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchUsers} />;
  }

  return (
    <Box>
      {/* Header */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              User Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage all users in the system
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setCreateModalOpen(true)}
            >
              Create User
            </Button>
          </Box>
        </Box>

        {/* Search and Filter */}
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <TextField
            placeholder="Search users..."
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
            label="Filter by Role"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="ALL">All Roles</MenuItem>
            <MenuItem value={UserRoleEnum.SUPER_ADMIN}>Super Admin</MenuItem>
            <MenuItem value={UserRoleEnum.ADMIN}>Admin</MenuItem>
            <MenuItem value={UserRoleEnum.STAFF}>Staff</MenuItem>
            <MenuItem value={UserRoleEnum.PATIENT}>Patient</MenuItem>
            <MenuItem value={UserRoleEnum.DOCTOR}>Doctor</MenuItem>
          </TextField>
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Total Users
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              {users.length}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Filtered Results
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              {filteredUsers.length}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* User List */}
      <UserList
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {/* Modals */}
      <CreateUserModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateUser}
      />

      <UpdateStatusModal
        open={updateModalOpen}
        user={selectedUser}
        onClose={() => {
          setUpdateModalOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={handleUpdateStatus}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        user={selectedUser}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={handleDeleteUser}
      />

      <ViewUserModal
        open={viewModalOpen}
        user={selectedUser}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedUser(null);
        }}
      />
    </Box>
  );
};

export default UsersPage;
