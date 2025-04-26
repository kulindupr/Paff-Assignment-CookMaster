"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaCertificate, FaGraduationCap, FaTrophy, FaChartLine, FaPlus, FaTrash, FaEdit } from "react-icons/fa"
import SkillCard from "../components/skills/SkillCard"
import CertificateCard from "../components/skills/CertificateCard"
import CourseProgressCard from "../components/skills/CourseProgressCard"
import Loader from "../components/common/Loader"
import ErrorMessage from "../components/common/ErrorMessage"
import useAuth from "../hooks/useAuth"
import skillService from "../services/skillService"
import '../styles/SkillsDashboard.css'

const SkillsDashboardPage = () => {
  const { currentUser } = useAuth()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("skills")
  const [showAddSkillModal, setShowAddSkillModal] = useState(false)
  const [newSkill, setNewSkill] = useState("")
  const [addingSkill, setAddingSkill] = useState(false)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const data = await skillService.getUserSkillsDashboard()
      setDashboardData(data)
      setError(null)
    } catch (err) {
      setError("Failed to fetch skills dashboard. Please try again later.")
      console.error("Error fetching skills dashboard:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddSkill = async () => {
    if (!newSkill.trim()) {
      return
    }

    try {
      setAddingSkill(true)
      await skillService.addUserSkill(newSkill)
      setNewSkill("")
      setShowAddSkillModal(false)
      fetchDashboardData() // Refresh dashboard data
    } catch (err) {
      setError("Failed to add skill. Please try again.")
      console.error("Error adding skill:", err)
    } finally {
      setAddingSkill(false)
    }
  }

  const handleRemoveSkill = async (skillId) => {
    try {
      await skillService.removeUserSkill(skillId)
      fetchDashboardData() // Refresh dashboard data
    } catch (err) {
      setError("Failed to remove skill. Please try again.")
      console.error("Error removing skill:", err)
    }
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (!dashboardData) {
    return <ErrorMessage message="No dashboard data available" />
  }

  const { skills, certificates, courseProgress, stats } = dashboardData

  return (
    <div className="skills-dashboard-page">
      <div className="dashboard-header">
        <h1>Skills & Qualifications Dashboard</h1>
        <div className="dashboard-stats">
          <div className="stat-card">
            <FaCertificate className="stat-icon" />
            <div className="stat-content">
              <h3>{stats.certificatesCount}</h3>
              <p>Certificates</p>
            </div>
          </div>
          <div className="stat-card">
            <FaGraduationCap className="stat-icon" />
            <div className="stat-content">
              <h3>{stats.completedCoursesCount}</h3>
              <p>Completed Courses</p>
            </div>
          </div>
          <div className="stat-card">
            <FaTrophy className="stat-icon" />
            <div className="stat-content">
              <h3>{stats.skillsCount}</h3>
              <p>Skills Acquired</p>
            </div>
          </div>
          <div className="stat-card">
            <FaChartLine className="stat-icon" />
            <div className="stat-content">
              <h3>{stats.overallProgress}%</h3>
              <p>Overall Progress</p>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === "skills" ? "active" : ""}`}
          onClick={() => setActiveTab("skills")}
        >
          Skills
        </button>
        <button
          className={`tab-button ${activeTab === "certificates" ? "active" : ""}`}
          onClick={() => setActiveTab("certificates")}
        >
          Certificates
        </button>
        <button
          className={`tab-button ${activeTab === "progress" ? "active" : ""}`}
          onClick={() => setActiveTab("progress")}
        >
          Course Progress
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === "skills" && (
          <div className="skills-section">
            <div className="section-header">
              <h2>My Skills</h2>
              <button className="btn btn-primary" onClick={() => setShowAddSkillModal(true)}>
                <FaPlus />
                <span>Add Skill</span>
              </button>
            </div>

            {skills.length > 0 ? (
              <div className="skills-grid">
                {skills.map((skill) => (
                  <SkillCard
                    key={skill._id}
                    skill={skill}
                    onRemove={() => handleRemoveSkill(skill._id)}
                    isEditable={true}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No skills added yet</p>
                <button className="btn btn-primary" onClick={() => setShowAddSkillModal(true)}>
                  Add Your First Skill
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "certificates" && (
          <div className="certificates-section">
            <h2>My Certificates</h2>

            {certificates.length > 0 ? (
              <div className="certificates-grid">
                {certificates.map((certificate) => (
                  <CertificateCard key={certificate._id} certificate={certificate} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No certificates earned yet</p>
                <Link to="/courses" className="btn btn-primary">
                  Explore Courses
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === "progress" && (
          <div className="progress-section">
            <h2>Course Progress</h2>

            {courseProgress.length > 0 ? (
              <div className="progress-grid">
                {courseProgress.map((progress) => (
                  <CourseProgressCard key={progress._id} progress={progress} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No courses in progress</p>
                <Link to="/courses" className="btn btn-primary">
                  Enroll in Courses
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {showAddSkillModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Skill</h3>
              <button className="close-button" onClick={() => setShowAddSkillModal(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="skill-name">Skill Name</label>
                <input
                  type="text"
                  id="skill-name"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Enter skill name"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowAddSkillModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddSkill} disabled={addingSkill || !newSkill.trim()}>
                {addingSkill ? "Adding..." : "Add Skill"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SkillsDashboardPage

