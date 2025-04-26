import api from "./api"

const authService = {
  // Register a new user
  register: async (userData) => {
    const response = await api.post("/users/auth/register", userData)
    return response.data
  },

  // Login user
  login: async (email, password) => {
    const response = await api.post("/users/auth/login", { email, password })
    return response.data
  },

  // Get current user data
  getCurrentUser: async () => {
    const response = await api.get("/users/me")
    return response.data
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put("/users/me", userData)
    return response.data
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await api.post("/auth/change-password", passwordData)
    return response.data
  },

  // Request password reset
  requestPasswordReset: async (email) => {
    const response = await api.post("/auth/forgot-password", { email })
    return response.data
  },

  // Reset password with token
  resetPassword: async (token, newPassword) => {
    const response = await api.post("/auth/reset-password", {
      token,
      newPassword,
    })
    return response.data
  },
}

export default authService

