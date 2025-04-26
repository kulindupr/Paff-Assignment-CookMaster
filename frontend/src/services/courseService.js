import api from "./api"

const courseService = {
  // Get all courses
  getAllCourses: async () => {
    try {
      const response = await api.get("/courses")
      return response.data
    } catch (error) {
      console.error("Error fetching courses:", error)
      throw error
    }
  },

  // Get course by ID
  getCourseById: async (id) => {
    try {
      const response = await api.get(`/courses/${id}`)
      return response.data
    } catch (error) {
      console.error("Error fetching course:", error)
      throw error
    }
  },

  // Get courses by instructor
  getCoursesByInstructor: async (instructorId) => {
    try {
      const response = await api.get(`/courses/instructor/${instructorId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching instructor courses:", error)
      throw error
    }
  },

  // Create new course
  createCourse: async (courseData) => {
    try {
      const response = await api.post("/courses", courseData)
      return response.data
    } catch (error) {
      console.error("Error creating course:", error)
      throw error
    }
  },

  // Update course
  updateCourse: async (id, courseData) => {
    try {
      const response = await api.put(`/courses/${id}`, courseData)
      return response.data
    } catch (error) {
      console.error("Error updating course:", error)
      throw error
    }
  },

  // Delete course
  deleteCourse: async (id) => {
    try {
      await api.delete(`/courses/${id}`)
    } catch (error) {
      console.error("Error deleting course:", error)
      throw error
    }
  },

  // Search courses
  searchCourses: async (query) => {
    try {
      const response = await api.get(`/courses/search?query=${query}`)
      return response.data
    } catch (error) {
      console.error("Error searching courses:", error)
      throw error
    }
  },

  // Get courses by level
  getCoursesByLevel: async (level) => {
    try {
      const response = await api.get(`/courses/level/${level}`)
      return response.data
    } catch (error) {
      console.error("Error fetching courses by level:", error)
      throw error
    }
  },

  // Enroll in a course
  enrollCourse: async (courseId) => {
    const response = await api.post(`/courses/${courseId}/enroll`)
    return response.data
  },

  // Get enrolled courses for current user
  getEnrolledCourses: async () => {
    const response = await api.get("/courses/enrolled")
    return response.data
  },

  // Get courses created by current user
  getCreatedCourses: async () => {
    const response = await api.get("/courses/created")
    return response.data
  },

  // Get courses by user ID
  getUserCourses: async (userId) => {
    const response = await api.get(`/users/${userId}/courses`)
    return response.data
  },

  // Submit course for review
  submitForReview: async (courseId) => {
    const response = await api.post(`/courses/${courseId}/submit`)
    return response.data
  },

  // Get related courses
  getRelatedCourses: async (courseId, tags) => {
    const params = { tags: tags.join(",") }
    const response = await api.get(`/courses/related/${courseId}`, { params })
    return response.data
  },
}

export default courseService

