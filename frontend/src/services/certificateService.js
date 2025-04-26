import api from "./api"

const certificateService = {
  // Get user certificates
  getUserCertificates: async (userId) => {
    const response = await api.get(userId ? `/certificates/user/${userId}` : "/certificates/me")
    return response.data
  },

  // Get certificate by ID
  getCertificateById: async (id) => {
    const response = await api.get(`/certificates/${id}`)
    return response.data
  },

  // Verify certificate
  verifyCertificate: async (certificateNumber) => {
    const response = await api.get(`/certificates/verify/${certificateNumber}`)
    return response.data
  },

  // Generate certificate
  generateCertificate: async (courseId) => {
    const response = await api.post(`/certificates/generate/${courseId}`)
    return response.data
  },
}

export default certificateService

