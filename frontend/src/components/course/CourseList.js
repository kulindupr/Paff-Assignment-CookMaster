"use client"

import { useState, useEffect } from "react"
import CourseCard from "./CourseCard"
import CourseFilter from "./CourseFilter"
import Pagination from "../common/Pagination"
import Loader from "../common/Loader"
import ErrorMessage from "../common/ErrorMessage"
import courseService from "../../services/courseService"
import "../../styles/CourseList.css"

const CourseList = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    search: "",
    level: "",
    tags: [],
    sort: "newest",
  })
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
  })

  useEffect(() => {
    fetchCourses()
  }, [filters, pagination.page, pagination.limit])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search: filters.search,
        level: filters.level,
        tags: filters.tags.join(","),
        sort: filters.sort,
      }

      const data = await courseService.getAllCourses(params)
      setCourses(data.courses)
      setPagination((prev) => ({
        ...prev,
        total: data.total,
      }))
      setError(null)
    } catch (err) {
      setError("Failed to fetch courses. Please try again later.")
      console.error("Error fetching courses:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setPagination((prev) => ({
      ...prev,
      page: 1, // Reset to first page when filters change
    }))
  }

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }))
  }

  if (loading && courses.length === 0) {
    return <Loader />
  }

  if (error && courses.length === 0) {
    return <ErrorMessage message={error} />
  }

  return (
    <div className="course-list-container">
      <CourseFilter filters={filters} onFilterChange={handleFilterChange} />

      {courses.length === 0 ? (
        <div className="no-courses">
          <h3>No courses found</h3>
          <p>Try adjusting your filters or search criteria</p>
        </div>
      ) : (
        <>
          <div className="course-grid">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>

          <Pagination
            currentPage={pagination.page}
            totalPages={Math.ceil(pagination.total / pagination.limit)}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  )
}

export default CourseList

