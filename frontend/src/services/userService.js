import api from "./api"

const userService = {
  // Get user profile
  getUserProfile: async (userId) => {
    const response = await api.get(`/users/profile/${userId}`)
    return response.data
  },

  // Update user profile
  updateUserProfile: async (userData) => {
    const response = await api.put("/users/me", userData)
    return response.data
  },

  // Follow a user
  followUser: async (userId) => {
    const response = await api.post(`/users/follow/${userId}`)
    return response.data
  },

  // Unfollow a user
  unfollowUser: async (userId) => {
    const response = await api.post(`/users/unfollow/${userId}`)
    return response.data
  },

  // Get user followers
  getUserFollowers: async (userId) => {
    const response = await api.get(`/users/${userId}/followers`)
    return response.data
  },

  // Get user following
  getUserFollowing: async (userId) => {
    const response = await api.get(`/users/${userId}/following`)
    return response.data
  },

  // Upload profile picture
  uploadProfilePicture: async (formData) => {
    const response = await api.post("/users/profile-picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  },
}

export default userService

