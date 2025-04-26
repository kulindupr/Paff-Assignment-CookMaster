import api from "./api"

const skillService = {
  // Get user skills dashboard
  getUserSkillsDashboard: async () => {
    const response = await api.get("/users/skills/dashboard")
    return response.data
  },

  // Get user skills
  getUserSkills: async () => {
    const response = await api.get("/users/skills")
    return response.data
  },

  // Add a skill
  addUserSkill: async (skill) => {
    const response = await api.post("/users/skills", { skill })
    return response.data
  },

  // Remove a skill
  removeUserSkill: async (skillId) => {
    const response = await api.delete(`/users/skills/${skillId}`)
    return response.data
  },

  // Get course progress
  getCourseProgress: async () => {
    const response = await api.get("/users/courses/progress")
    return response.data
  },

  // Update course progress
  updateCourseProgress: async (courseId, progressData) => {
    const response = await api.put(`/users/courses/${courseId}/progress`, progressData)
    return response.data
  },
}

export default skillService

