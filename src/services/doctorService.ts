import apiClient from './apiClient';
import type { Doctor, OnboardDoctorRequest, DoctorStatus, Specialization } from '../types';

export const doctorService = {
  /**
   * Get all doctors
   */
  getAllDoctors: async (): Promise<Doctor[]> => {
    const response = await apiClient.get<Doctor[]>('/doctors');
    return response.data;
  },

  /**
   * Get doctors by specialization
   */
  getDoctorsBySpecialization: async (specialization: Specialization): Promise<Doctor[]> => {
    const response = await apiClient.get<Doctor[]>(`/doctors/specialization/${specialization}`);
    return response.data;
  },

  /**
   * Get doctor by ID
   */
  getDoctorById: async (doctorId: number): Promise<Doctor> => {
    const response = await apiClient.get<Doctor>(`/doctors/${doctorId}`);
    return response.data;
  },

  /**
   * Onboard a new doctor
   */
  onboardDoctor: async (doctorData: OnboardDoctorRequest): Promise<Doctor> => {
    const response = await apiClient.post<Doctor>('/doctors/onboard', doctorData);
    return response.data;
  },

  /**
   * Update doctor status
   */
  updateDoctorStatus: async (doctorId: number, status: DoctorStatus): Promise<Doctor> => {
    const response = await apiClient.patch<Doctor>(`/doctors/${doctorId}/status`, null, {
      params: { status },
    });
    return response.data;
  },

  /**
   * Delete doctor
   */
  deleteDoctor: async (doctorId: number): Promise<void> => {
    await apiClient.delete(`/doctors/${doctorId}`);
  },
};

