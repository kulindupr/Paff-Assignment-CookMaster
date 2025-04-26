"use client"

import { useState, useEffect } from "react"
import { FaFilter, FaSearch, FaSortAmountDown } from "react-icons/fa"
import CourseList from "../components/course/CourseList"
import CourseFilter from "../components/course/CourseFilter"
import Pagination from "../components/common/Pagination"
import Loader from "../components/common/Loader"
import ErrorMessage from "../components/common/ErrorMessage"
import courseService from "../services/courseService"
import "../styles/CoursesPage.css"

const CoursesPage = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
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
  }, [filters, pagination.page])

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

  const handleSearch = (e) => {
    e.preventDefault()
    const searchInput = e.target.elements.search.value
    setFilters((prev) => ({
      ...prev,
      search: searchInput,
    }))
  }

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }))
    // Scroll to top when changing page
    window.scrollTo(0, 0)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h1>Explore Cooking Courses</h1>
        <p>Discover courses from beginner to advanced levels</p>

        <div className="search-bar-container">
          <form onSubmit={handleSearch} className="search-bar">
            <input type="text" name="search" placeholder="Search for courses..." defaultValue={filters.search} />
            <button type="submit" className="search-button">
              <FaSearch />
              <span>Search</span>
            </button>
          </form>
        </div>

        <div className="filter-controls">
          <button className="filter-toggle-button" onClick={toggleFilters}>
            <FaFilter />
            <span>Filters</span>
          </button>

          <div className="sort-dropdown">
            <label htmlFor="sort">
              <FaSortAmountDown />
              <span>Sort by:</span>
            </label>
            <select
              id="sort"
              value={filters.sort}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sort: e.target.value,
                }))
              }
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="courses-content">
        <div className={`filters-sidebar ${showFilters ? "show" : ""}`}>
          <CourseFilter filters={filters} onFilterChange={handleFilterChange} onClose={() => setShowFilters(false)} />
        </div>

        <div className="courses-main">
          {loading && courses.length === 0 ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : courses.length === 0 ? (
            <div className="no-courses">
              <h3>No courses found</h3>
              <p>Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            <>
              <CourseList courses={courses} />

              <Pagination
                currentPage={pagination.page}
                totalPages={Math.ceil(pagination.total / pagination.limit)}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CoursesPage

