import api from "./api"

const reviewService = {
  // Get reviews for a course
  getReviewsByCourse: async (courseId, params = {}) => {
    const response = await api.get(`/reviews/course/${courseId}`, { params })
    return response.data
  },

  // Get reviews by current user
  getReviewsByUser: async (params = {}) => {
    const response = await api.get("/reviews/user", { params })
    return response.data
  },

  // Create a review
  createReview: async (courseId, reviewData) => {
    const response = await api.post(`/reviews/course/${courseId}`, reviewData)
    return response.data
  },

  // Update a review
  updateReview: async (reviewId, reviewData) => {
    const response = await api.put(`/reviews/${reviewId}`, reviewData)
    return response.data
  },

  // Delete a review
  deleteReview: async (reviewId) => {
    const response = await api.delete(`/reviews/${reviewId}`)
    return response.data
  },
}

export default reviewService

