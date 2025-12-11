import { describe, it, expect, vi, beforeEach } from 'vitest';
import { userService } from '../userService';
import apiClient from '../apiClient';
import { UserStatus, UserRole } from '../../types';

// Mock the apiClient
vi.mock('../apiClient');

describe('UserService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should fetch all users successfully', async () => {
      const mockUsers = [
        {
          id: 1,
          username: 'john_doe',
          email: 'john@example.com',
          firstName: 'John',
          lastName: 'Doe',
          phoneNumber: '1234567890',
          role: UserRole.PATIENT,
          status: UserStatus.ACTIVE,
          createdAt: '2024-01-01',
          lastLogin: '2024-01-15',
        },
      ];

      vi.mocked(apiClient.get).mockResolvedValue({ data: mockUsers });

      const result = await userService.getAllUsers();

      expect(apiClient.get).toHaveBeenCalledWith('/users');
      expect(result).toEqual(mockUsers);
    });

    it('should handle errors when fetching users', async () => {
      const errorMessage = 'Network error';
      vi.mocked(apiClient.get).mockRejectedValue(new Error(errorMessage));

      await expect(userService.getAllUsers()).rejects.toThrow(errorMessage);
    });
  });

  describe('getUserById', () => {
    it('should fetch user by id successfully', async () => {
      const mockUser = {
        id: 1,
        username: 'john_doe',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890',
        role: UserRole.PATIENT,
        status: UserStatus.ACTIVE,
        createdAt: '2024-01-01',
        lastLogin: '2024-01-15',
      };

      vi.mocked(apiClient.get).mockResolvedValue({ data: mockUser });

      const result = await userService.getUserById(1);

      expect(apiClient.get).toHaveBeenCalledWith('/users/1');
      expect(result).toEqual(mockUser);
    });
  });

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      const newUser = {
        username: 'jane_doe',
        email: 'jane@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Doe',
        phoneNumber: '9876543210',
        role: UserRole.PATIENT,
      };

      const createdUser = {
        id: 2,
        ...newUser,
        status: UserStatus.ACTIVE,
        createdAt: '2024-01-16',
        lastLogin: null,
      };

      vi.mocked(apiClient.post).mockResolvedValue({ data: createdUser });

      const result = await userService.createUser(newUser);

      expect(apiClient.post).toHaveBeenCalledWith('/users', newUser);
      expect(result).toEqual(createdUser);
    });
  });

  describe('updateUserStatus', () => {
    it('should update user status successfully', async () => {
      const userId = 1;
      const newStatus = UserStatus.SUSPENDED;
      const updatedUser = {
        id: userId,
        username: 'john_doe',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890',
        role: UserRole.PATIENT,
        status: newStatus,
        createdAt: '2024-01-01',
        lastLogin: '2024-01-15',
      };

      vi.mocked(apiClient.patch).mockResolvedValue({ data: updatedUser });

      const result = await userService.updateUserStatus(userId, newStatus);

      expect(apiClient.patch).toHaveBeenCalledWith(`/users/${userId}/status`, null, {
        params: { status: newStatus },
      });
      expect(result).toEqual(updatedUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      const userId = 1;
      vi.mocked(apiClient.delete).mockResolvedValue({ data: null });

      await userService.deleteUser(userId);

      expect(apiClient.delete).toHaveBeenCalledWith(`/users/${userId}`);
    });
  });
});

