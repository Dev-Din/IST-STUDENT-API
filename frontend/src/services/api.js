import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: async (data) => {
    const response = await api.post("/login", data);
    return response.data;
  },

  register: async (data) => {
    const response = await api.post("/register", data);
    return response.data;
  },

  logout: async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  changePassword: async (passwordData) => {
    const response = await api.post("/change-password", passwordData);
    return response.data;
  },
};

// Student API calls
export const studentAPI = {
  getAll: async () => {
    const response = await api.get("/students");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/students/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/students", data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/students/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/students/${id}`);
  },

  getStats: async () => {
    const students = await studentAPI.getAll();
    const total = students.length;
    const male = students.filter((s) => s.gender === "Male").length;
    const female = students.filter((s) => s.gender === "Female").length;

    return { total, male, female };
  },
};

export default api;
