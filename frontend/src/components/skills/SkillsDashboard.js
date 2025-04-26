"use client"

import { useState, useEffect } from "react"
import { FaCertificate, FaGraduationCap, FaTrophy, FaChartLine } from "react-icons/fa"
import SkillCard from "./SkillCard"
import CertificateCard from "./CertificateCard"
import CourseProgressCard from "./CourseProgressCard"
import Loader from "../common/Loader"
import ErrorMessage from "../common/ErrorMessage"
import skillService from "../../services/skillService"
import "../../styles/SkillsDashboard.css"

const SkillsDashboard = ({ userId }) => {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("skills")

  useEffect(() => {
    fetchDashboardData()
  }, [userId])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const data = await skillService.getUserSkillsDashboard(userId)
      setDashboardData(data)
      setError(null)
    } catch (err) {
      setError("Failed to fetch skills dashboard. Please try again later.")
      console.error("Error fetching skills dashboard:", err)
    } finally {
      setLoading(false)
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
    <div className="skills-dashboard">
      <div className="dashboard-header">
        <h2>Skills & Qualifications Dashboard</h2>
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
          <div className="skills-grid">
            {skills.length > 0 ? (
              skills.map((skill) => <SkillCard key={skill._id} skill={skill} />)
            ) : (
              <p className="no-data-message">No skills acquired yet</p>
            )}
          </div>
        )}

        {activeTab === "certificates" && (
          <div className="certificates-grid">
            {certificates.length > 0 ? (
              certificates.map((certificate) => <CertificateCard key={certificate._id} certificate={certificate} />)
            ) : (
              <p className="no-data-message">No certificates earned yet</p>
            )}
          </div>
        )}

        {activeTab === "progress" && (
          <div className="progress-grid">
            {courseProgress.length > 0 ? (
              courseProgress.map((progress) => <CourseProgressCard key={progress._id} progress={progress} />)
            ) : (
              <p className="no-data-message">No courses in progress</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SkillsDashboard

