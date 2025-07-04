import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { AuthResponse, LoginCredentials, RegisterCredentials, Student, StudentFormData } from '../types';

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/login', credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/register', credentials);
    return response.data;
  },
};

// Students API
export const studentsAPI = {
  getAll: async (): Promise<Student[]> => {
    const response = await api.get<Student[]>('/getAllStudents');
    return response.data;
  },

  getById: async (id: string): Promise<Student> => {
    const response = await api.get<Student>(`/getStudent/${id}`);
    return response.data;
  },

  create: async (student: StudentFormData): Promise<Student> => {
    const response = await api.post<Student>('/addStudent', student);
    return response.data;
  },

  update: async (id: string, student: Partial<StudentFormData>): Promise<Student> => {
    const response = await api.patch<Student>(`/updateStudent/${id}`, student);
    return response.data;
  },

  delete: async (id: string): Promise<Student> => {
    const response = await api.delete<Student>(`/deleteStudent/${id}`);
    return response.data;
  },
};

export default api;