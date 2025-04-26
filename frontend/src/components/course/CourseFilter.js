"use client"

import { useState, useEffect } from "react"
import { FaFilter, FaTimes } from "react-icons/fa"
import "../../styles/CourseFilter.css"

const CourseFilter = ({ filters, onFilterChange, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters)
  const [availableTags, setAvailableTags] = useState([
    "Baking",
    "Italian",
    "Asian",
    "Desserts",
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Quick Meals",
    "Breakfast",
    "Dinner",
  ])

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTagToggle = (tag) => {
    setLocalFilters((prev) => {
      const currentTags = [...prev.tags]

      if (currentTags.includes(tag)) {
        return {
          ...prev,
          tags: currentTags.filter((t) => t !== tag),
        }
      } else {
        return {
          ...prev,
          tags: [...currentTags, tag],
        }
      }
    })
  }

  const handleClearFilters = () => {
    setLocalFilters({
      search: "",
      level: "",
      tags: [],
      sort: "newest",
    })
  }

  const handleApplyFilters = () => {
    onFilterChange(localFilters)
    if (onClose) {
      onClose()
    }
  }

  return (
    <div className="course-filter">
      <div className="filter-header">
        <h3>
          <FaFilter className="filter-icon" />
          Filter Courses
        </h3>
        {onClose && (
          <button className="close-filter" onClick={onClose}>
            <FaTimes />
          </button>
        )}
      </div>

      <div className="filter-body">
        <div className="filter-group">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            id="search"
            name="search"
            value={localFilters.search}
            onChange={handleInputChange}
            placeholder="Search courses..."
          />
        </div>

        <div className="filter-group">
          <label htmlFor="level">Level</label>
          <select id="level" name="level" value={localFilters.level} onChange={handleInputChange}>
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort">Sort By</label>
          <select id="sort" name="sort" value={localFilters.sort} onChange={handleInputChange}>
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Tags</label>
          <div className="tags-container">
            {availableTags.map((tag) => (
              <div
                key={tag}
                className={`filter-tag ${localFilters.tags.includes(tag) ? "selected" : ""}`}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="filter-footer">
        <button className="clear-filters-btn" onClick={handleClearFilters}>
          Clear Filters
        </button>
        <button className="apply-filters-btn" onClick={handleApplyFilters}>
          Apply Filters
        </button>
      </div>
    </div>
  )
}

export default CourseFilter

