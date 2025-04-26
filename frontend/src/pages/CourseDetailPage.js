"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { FaStar, FaUsers, FaClock, FaChalkboardTeacher, FaBookmark, FaShare, FaRegStar } from "react-icons/fa"
import ReviewList from "../components/review/ReviewList"
import ReviewForm from "../components/review/ReviewForm"
import CourseModuleList from "../components/course/CourseModuleList"
import RelatedCourses from "../components/course/RelatedCourses"
import Loader from "../components/common/Loader"
import ErrorMessage from "../components/common/ErrorMessage"
import useAuth from "../hooks/useAuth"
import courseService from "../services/courseService"
import "../styles/CourseDetailPage.css"

const CourseDetailPage = () => {
  const { id } = useParams()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [enrolling, setEnrolling] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    fetchCourseDetails()
  }, [id])

  const fetchCourseDetails = async () => {
    try {
      setLoading(true)
      const data = await courseService.getCourseById(id)
      setCourse(data)

      // Check if user is enrolled
      if (currentUser) {
        const enrolledCourses = await courseService.getEnrolledCourses()
        setIsEnrolled(enrolledCourses.some((course) => course._id === id))
      }

      setError(null)
    } catch (err) {
      setError("Failed to fetch course details. Please try again later.")
      console.error("Error fetching course details:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async () => {
    if (!currentUser) {
      navigate("/login", { state: { from: { pathname: `/courses/${id}` } } })
      return
    }

    try {
      setEnrolling(true)
      await courseService.enrollCourse(id)
      setIsEnrolled(true)
    } catch (err) {
      console.error("Error enrolling in course:", err)
    } finally {
      setEnrolling(false)
    }
  }

  const handleReviewSubmitted = (newReview) => {
    setCourse((prev) => ({
      ...prev,
      reviews: [newReview, ...prev.reviews],
      averageRating: (prev.averageRating * prev.reviews.length + newReview.rating) / (prev.reviews.length + 1),
    }))
  }

  if (loading) {
    return <Loader />
  }

  if (error || !course) {
    return <ErrorMessage message={error || "Course not found"} />
  }

  return (
    <div className="course-detail-page">
      <div className="course-header">
        <div className="course-header-content">
          <div className="course-breadcrumb">
            <Link to="/courses">Courses</Link> / <span>{course.title}</span>
          </div>

          <h1 className="course-title">{course.title}</h1>

          <div className="course-meta">
            <div className="course-rating">
              <FaStar className="icon" />
              <span>{course.averageRating.toFixed(1)}</span>
              <span className="reviews-count">({course.reviews.length} reviews)</span>
            </div>

            <div className="course-students">
              <FaUsers className="icon" />
              <span>{course.enrollmentCount} students</span>
            </div>

            <div className="course-duration">
              <FaClock className="icon" />
              <span>{course.duration}</span>
            </div>

            <div className="course-level">
              <span>{course.level}</span>
            </div>
          </div>

          <div className="course-instructor">
            <FaChalkboardTeacher className="icon" />
            <span>Instructor: </span>
            <Link to={`/profile/${course.instructor._id}`}>{course.instructor.name}</Link>
          </div>

          <div className="course-actions">
            {isEnrolled ? (
              <Link to={`/courses/${id}/learn`} className="btn btn-primary">
                Continue Learning
              </Link>
            ) : (
              <button className="btn btn-primary" onClick={handleEnroll} disabled={enrolling}>
                {enrolling ? "Enrolling..." : "Enroll Now"}
              </button>
            )}

            <button className="btn btn-icon">
              <FaBookmark />
              <span>Save</span>
            </button>

            <button className="btn btn-icon">
              <FaShare />
              <span>Share</span>
            </button>
          </div>
        </div>

        <div className="course-thumbnail">
          <img src={course.thumbnail || "/placeholder.svg?height=300&width=500"} alt={course.title} />
        </div>
      </div>

      <div className="course-tabs">
        <button
          className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>

        <button
          className={`tab-button ${activeTab === "curriculum" ? "active" : ""}`}
          onClick={() => setActiveTab("curriculum")}
        >
          Curriculum
        </button>

        <button
          className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      <div className="course-content">
        {activeTab === "overview" && (
          <div className="course-overview">
            <div className="course-description">
              <h2>About This Course</h2>
              <div dangerouslySetInnerHTML={{ __html: course.description }} />
            </div>

            <div className="course-tags">
              <h3>Tags</h3>
              <div className="tags-container">
                {course.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="what-youll-learn">
              <h3>What You'll Learn</h3>
              <ul>
                {/* This would be populated from course data */}
                <li>Master essential cooking techniques</li>
                <li>Understand flavor combinations and food pairings</li>
                <li>Create impressive dishes from scratch</li>
                <li>Develop your own unique cooking style</li>
              </ul>
            </div>

            <div className="prerequisites">
              <h3>Prerequisites</h3>
              <p>No prior cooking experience required. Just bring your enthusiasm and willingness to learn!</p>
            </div>
          </div>
        )}

        {activeTab === "curriculum" && (
          <div className="course-curriculum">
            <h2>Course Curriculum</h2>
            <CourseModuleList modules={course.modules} />
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="course-reviews">
            <h2>Student Reviews</h2>

            <div className="reviews-summary">
              <div className="average-rating">
                <div className="rating-number">{course.averageRating.toFixed(1)}</div>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>{star <= Math.round(course.averageRating) ? <FaStar /> : <FaRegStar />}</span>
                  ))}
                </div>
                <div className="rating-count">{course.reviews.length} ratings</div>
              </div>

              <div className="rating-breakdown">
                {/* This would be populated from course data */}
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="rating-bar">
                    <span className="rating-label">{rating} stars</span>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: `${Math.random() * 100}%` }}></div>
                    </div>
                    <span className="rating-percent">{Math.floor(Math.random() * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>

            {currentUser && !isEnrolled ? (
              <div className="review-notice">You need to enroll in this course to leave a review.</div>
            ) : currentUser ? (
              <ReviewForm courseId={id} onReviewSubmitted={handleReviewSubmitted} />
            ) : (
              <div className="review-notice">
                Please <Link to="/login">sign in</Link> to leave a review.
              </div>
            )}

            <ReviewList reviews={course.reviews} />
          </div>
        )}
      </div>

      <div className="related-courses-section">
        <h2>Related Courses</h2>
        <RelatedCourses currentCourseId={id} tags={course.tags} />
      </div>
    </div>
  )
}

export default CourseDetailPage

