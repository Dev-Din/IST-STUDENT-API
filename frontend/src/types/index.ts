// API Response Types
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: {
    status: number;
    message: string;
  };
}

// User Types
export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

// Student Types
export interface Student {
  _id: string;
  firstname: string;
  lastname: string;
  gender?: string;
}

export interface StudentFormData {
  firstname: string;
  lastname: string;
  gender?: string;
}

// Auth Context Types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}