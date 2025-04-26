import api from "./api"

const authService = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await api.post("/users/auth/register", userData)
      const { token, user } = response.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      return user
    } catch (error) {
      throw error.response?.data || "Registration failed"
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post("/users/auth/login", { email, password })
      const { token, user } = response.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      return user
    } catch (error) {
      throw error.response?.data || "Login failed"
    }
  },

  // Get current user data
  getCurrentUser: () => {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
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

  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token")
  }
}

export default authService

