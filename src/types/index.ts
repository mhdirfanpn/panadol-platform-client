// Enums
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
  STAFF = 'STAFF',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING = 'PENDING',
  ON_LEAVE = 'ON_LEAVE',
}

export enum DoctorStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING = 'PENDING',
  ON_LEAVE = 'ON_LEAVE',
}

export enum Specialization {
  GENERAL_PHYSICIAN = 'GENERAL_PHYSICIAN',
  CARDIOLOGIST = 'CARDIOLOGIST',
  DERMATOLOGIST = 'DERMATOLOGIST',
  PEDIATRICIAN = 'PEDIATRICIAN',
  ORTHOPEDIC = 'ORTHOPEDIC',
  NEUROLOGIST = 'NEUROLOGIST',
  PSYCHIATRIST = 'PSYCHIATRIST',
  GYNECOLOGIST = 'GYNECOLOGIST',
  OPHTHALMOLOGIST = 'OPHTHALMOLOGIST',
  ENT_SPECIALIST = 'ENT_SPECIALIST',
  DENTIST = 'DENTIST',
  RADIOLOGIST = 'RADIOLOGIST',
  ANESTHESIOLOGIST = 'ANESTHESIOLOGIST',
  SURGEON = 'SURGEON',
}

// User Types
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastLogin?: string | null;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phoneNumber: string;
  role: UserRole;
}

// Doctor Types
export interface Doctor {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  specialization: Specialization;
  licenseNumber: string;
  experienceYears: number;
  qualifications: string;
  bio: string;
  consultationFee: number;
  status: DoctorStatus;
  createdAt: string;
}

export interface OnboardDoctorRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phoneNumber: string;
  specialization: Specialization;
  licenseNumber: string;
  experienceYears: number;
  qualifications: string;
  bio: string;
  consultationFee: number;
}

// Dashboard Types
export interface DashboardStats {
  totalUsers: number;
  totalDoctors: number;
  totalPatients: number;
  activeUsers: number;
  activeDoctors: number;
  pendingUsers: number;
}

// API Error Response
export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
}

