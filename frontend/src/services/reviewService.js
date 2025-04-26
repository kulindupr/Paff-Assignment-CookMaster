import api from "./api"

const reviewService = {
  // Get reviews for a course
  getReviewsByCourseId: async (courseId) => {
    try {
      const response = await api.get(`/reviews/course/${courseId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching reviews:", error)
      throw error
    }
  },

  // Get reviews by current user
  getReviewsByUserId: async (userId) => {
    try {
      const response = await api.get(`/reviews/user/${userId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching user reviews:", error)
      throw error
    }
  },

  // Create a review
  createReview: async (reviewData) => {
    try {
      const response = await api.post("/reviews", reviewData)
      return response.data
    } catch (error) {
      console.error("Error creating review:", error)
      throw error
    }
  },

  // Update a review
  updateReview: async (reviewId, reviewData) => {
    const response = await api.put(`/reviews/${reviewId}`, reviewData)
    return response.data
  },

  // Delete a review
  deleteReview: async (reviewId) => {
    try {
      await api.delete(`/reviews/${reviewId}`)
    } catch (error) {
      console.error("Error deleting review:", error)
      throw error
    }
  },
}

export default reviewService

