import apiClient from './apiClient';
import type { User, CreateUserRequest, UserRole, UserStatus } from '../types';

export const userService = {
  /**
   * Get all users
   */
  getAllUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  },

  /**
   * Get users by role
   */
  getUsersByRole: async (role: UserRole): Promise<User[]> => {
    const response = await apiClient.get<User[]>(`/users/role/${role}`);
    return response.data;
  },

  /**
   * Get user by ID
   */
  getUserById: async (userId: number): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${userId}`);
    return response.data;
  },

  /**
   * Create a new user
   */
  createUser: async (userData: CreateUserRequest): Promise<User> => {
    const response = await apiClient.post<User>('/users', userData);
    return response.data;
  },

  /**
   * Update user status
   */
  updateUserStatus: async (userId: number, status: UserStatus): Promise<User> => {
    const response = await apiClient.patch<User>(`/users/${userId}/status`, null, {
      params: { status },
    });
    return response.data;
  },

  /**
   * Delete user
   */
  deleteUser: async (userId: number): Promise<void> => {
    await apiClient.delete(`/users/${userId}`);
  },
};

