"use client"

import { useState, useEffect } from "react"
import CourseCard from "./CourseCard"
import Loader from "../common/Loader"
import ErrorMessage from "../common/ErrorMessage"
import courseService from "../../services/courseService"
import "../../styles/RelatedCourses.css"

const RelatedCourses = ({ currentCourseId, tags = [] }) => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchRelatedCourses()
  }, [currentCourseId, tags])

  const fetchRelatedCourses = async () => {
    try {
      setLoading(true)

      if (tags.length === 0) {
        setCourses([])
        return
      }

      const data = await courseService.getRelatedCourses(currentCourseId, tags)
      setCourses(data.courses)
      setError(null)
    } catch (err) {
      setError("Failed to fetch related courses")
      console.error("Error fetching related courses:", err)
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

  if (courses.length === 0) {
    return (
      <div className="no-related-courses">
        <p>No related courses found</p>
      </div>
    )
  }

  return (
    <div className="related-courses">
      <div className="related-courses-grid">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  )
}

export default RelatedCourses

