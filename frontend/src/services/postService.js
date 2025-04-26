import api from "./api"

const postService = {
  // Get news feed posts
  getNewsFeed: async (page = 1, limit = 10) => {
    const response = await api.get("/posts", {
      params: { page, limit },
    })
    return response.data
  },

  // Get posts by user
  getUserPosts: async (userId, page = 1, limit = 10) => {
    const response = await api.get(`/posts/user/${userId}`, {
      params: { page, limit },
    })
    return response.data
  },

  // Create a post
  createPost: async (postData) => {
    const response = await api.post("/posts", postData)
    return response.data
  },

  // Update a post
  updatePost: async (postId, postData) => {
    const response = await api.put(`/posts/${postId}`, postData)
    return response.data
  },

  // Delete a post
  deletePost: async (postId) => {
    const response = await api.delete(`/posts/${postId}`)
    return response.data
  },

  // Like a post
  likePost: async (postId) => {
    const response = await api.post(`/posts/${postId}/like`)
    return response.data
  },

  // Unlike a post
  unlikePost: async (postId) => {
    const response = await api.post(`/posts/${postId}/unlike`)
    return response.data
  },

  // Add a comment to a post
  addComment: async (postId, commentData) => {
    const response = await api.post(`/posts/${postId}/comment`, commentData)
    return response.data
  },

  // Update a comment
  updateComment: async (postId, commentId, commentData) => {
    const response = await api.put(`/posts/${postId}/comment/${commentId}`, commentData)
    return response.data
  },

  // Delete a comment
  deleteComment: async (postId, commentId) => {
    const response = await api.delete(`/posts/${postId}/comment/${commentId}`)
    return response.data
  },
}

export default postService

