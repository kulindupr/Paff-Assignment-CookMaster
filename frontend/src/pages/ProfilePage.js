"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { FaUserCircle, FaEdit, FaCertificate, FaGraduationCap, FaUsers, FaUserPlus, FaUserMinus } from "react-icons/fa"
import CourseCard from "../components/course/CourseCard"
import CertificateCard from "../components/skills/CertificateCard"
import PostCard from "../components/newsfeed/PostCard"
import Loader from "../components/common/Loader"
import ErrorMessage from "../components/common/ErrorMessage"
import useAuth from "../hooks/useAuth"
import userService from "../services/userService"
import courseService from "../services/courseService"
import postService from "../services/postService"
import certificateService from "../services/certificateService"
import "../styles/ProfilePage.css"

const ProfilePage = () => {
  const { id } = useParams()
  const { currentUser } = useAuth()

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("courses")
  const [isFollowing, setIsFollowing] = useState(false)
  const [followLoading, setFollowLoading] = useState(false)

  const [courses, setCourses] = useState([])
  const [certificates, setCertificates] = useState([])
  const [posts, setPosts] = useState([])

  const isOwnProfile = currentUser && (id === currentUser._id || id === "me")

  useEffect(() => {
    fetchProfileData()
  }, [id, currentUser])

  const fetchProfileData = async () => {
    try {
      setLoading(true)

      // Determine the ID to use
      const userId = id === "me" && currentUser ? currentUser._id : id

      // Fetch user profile
      const userData = await userService.getUserProfile(userId)
      setProfile(userData)

      // Check if current user is following this profile
      if (currentUser && currentUser._id !== userId) {
        setIsFollowing(currentUser.following.includes(userId))
      }

      // Fetch initial data for the default tab
      fetchTabData(activeTab, userId)

      setError(null)
    } catch (err) {
      setError("Failed to fetch profile data. Please try again later.")
      console.error("Error fetching profile data:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchTabData = async (tab, userId) => {
    try {
      switch (tab) {
        case "courses":
          const coursesData = await courseService.getUserCourses(userId)
          setCourses(coursesData)
          break
        case "certificates":
          const certificatesData = await certificateService.getUserCertificates(userId)
          setCertificates(certificatesData)
          break
        case "posts":
          const postsData = await postService.getUserPosts(userId)
          setPosts(postsData)
          break
        default:
          break
      }
    } catch (err) {
      console.error(`Error fetching ${tab} data:`, err)
    }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (profile) {
      fetchTabData(tab, profile._id)
    }
  }

  const handleFollow = async () => {
    if (!currentUser) {
      // Redirect to login
      return
    }

    try {
      setFollowLoading(true)

      if (isFollowing) {
        await userService.unfollowUser(profile._id)
        setIsFollowing(false)
      } else {
        await userService.followUser(profile._id)
        setIsFollowing(true)
      }
    } catch (err) {
      console.error("Error following/unfollowing user:", err)
    } finally {
      setFollowLoading(false)
    }
  }

  const handlePostUpdate = (updatedPost) => {
    setPosts((prev) => prev.map((post) => (post._id === updatedPost._id ? updatedPost : post)))
  }

  const handlePostDelete = (postId) => {
    setPosts((prev) => prev.filter((post) => post._id !== postId))
  }

  if (loading) {
    return <Loader />
  }

  if (error || !profile) {
    return <ErrorMessage message={error || "Profile not found"} />
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          {profile.profilePicture ? (
            <img src={profile.profilePicture || "/placeholder.svg"} alt={profile.name} />
          ) : (
            <FaUserCircle className="default-avatar" />
          )}
        </div>

        <div className="profile-info">
          <h1 className="profile-name">{profile.name}</h1>

          <div className="profile-stats">
            <div className="stat">
              <FaGraduationCap className="icon" />
              <span>{profile.completedCourses.length} Courses</span>
            </div>

            <div className="stat">
              <FaCertificate className="icon" />
              <span>{profile.certificates.length} Certificates</span>
            </div>

            <div className="stat">
              <FaUsers className="icon" />
              <span>{profile.followers.length} Followers</span>
            </div>
          </div>

          {profile.bio && <p className="profile-bio">{profile.bio}</p>}

          <div className="profile-actions">
            {isOwnProfile ? (
              <Link to="/profile/edit" className="btn btn-primary">
                <FaEdit />
                <span>Edit Profile</span>
              </Link>
            ) : (
              <button
                className={`btn ${isFollowing ? "btn-secondary" : "btn-primary"}`}
                onClick={handleFollow}
                disabled={followLoading}
              >
                {isFollowing ? (
                  <>
                    <FaUserMinus />
                    <span>Unfollow</span>
                  </>
                ) : (
                  <>
                    <FaUserPlus />
                    <span>Follow</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={`tab-button ${activeTab === "courses" ? "active" : ""}`}
          onClick={() => handleTabChange("courses")}
        >
          Courses
        </button>

        <button
          className={`tab-button ${activeTab === "certificates" ? "active" : ""}`}
          onClick={() => handleTabChange("certificates")}
        >
          Certificates
        </button>

        <button
          className={`tab-button ${activeTab === "posts" ? "active" : ""}`}
          onClick={() => handleTabChange("posts")}
        >
          Posts
        </button>
      </div>

      <div className="profile-content">
        {activeTab === "courses" && (
          <div className="courses-section">
            {courses.length === 0 ? (
              <div className="empty-state">
                <p>No courses yet</p>
                {isOwnProfile && (
                  <Link to="/courses" className="btn btn-primary">
                    Explore Courses
                  </Link>
                )}
              </div>
            ) : (
              <div className="courses-grid">
                {courses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "certificates" && (
          <div className="certificates-section">
            {certificates.length === 0 ? (
              <div className="empty-state">
                <p>No certificates yet</p>
                {isOwnProfile && (
                  <Link to="/courses" className="btn btn-primary">
                    Complete Courses to Earn Certificates
                  </Link>
                )}
              </div>
            ) : (
              <div className="certificates-grid">
                {certificates.map((certificate) => (
                  <CertificateCard key={certificate._id} certificate={certificate} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "posts" && (
          <div className="posts-section">
            {isOwnProfile && (
              <Link to="/news-feed/create" className="btn btn-primary create-post-btn">
                Create New Post
              </Link>
            )}

            {posts.length === 0 ? (
              <div className="empty-state">
                <p>No posts yet</p>
              </div>
            ) : (
              <div className="posts-list">
                {posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    onPostUpdate={handlePostUpdate}
                    onPostDelete={handlePostDelete}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage

