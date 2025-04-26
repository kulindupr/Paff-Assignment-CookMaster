import api from "./api"

const courseService = {
  // Get all courses
  getAllCourses: async (params = {}) => {
    const response = await api.get("/courses", { params })
    return response.data
  },

  // Get course by ID
  getCourseById: async (id) => {
    const response = await api.get(`/courses/${id}`)
    return response.data
  },

  // Create new course
  createCourse: async (courseData) => {
    const response = await api.post("/courses", courseData)
    return response.data
  },

  // Update course
  updateCourse: async (id, courseData) => {
    const response = await api.put(`/courses/${id}`, courseData)
    return response.data
  },

  // Delete course
  deleteCourse: async (id) => {
    const response = await api.delete(`/courses/${id}`)
    return response.data
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

