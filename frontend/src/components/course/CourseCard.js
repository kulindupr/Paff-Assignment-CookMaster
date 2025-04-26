import { Link } from "react-router-dom"
import { FaStar, FaUsers, FaClock } from "react-icons/fa"
import "../../styles/CourseCard.css"

const CourseCard = ({ course }) => {
  const { _id, title, thumbnail, instructor, level, duration, enrollmentCount, averageRating, tags } = course

  return (
    <div className="course-card">
      <div className="course-thumbnail">
        <img src={thumbnail || "/placeholder.svg?height=200&width=300"} alt={title} />
        <div className="course-level">{level}</div>
      </div>
      <div className="course-content">
        <h3 className="course-title">
          <Link to={`/courses/${_id}`}>{title}</Link>
        </h3>
        <div className="course-instructor">
          By <Link to={`/profile/${instructor._id}`}>{instructor.name}</Link>
        </div>
        <div className="course-meta">
          <div className="course-rating">
            <FaStar className="icon" />
            <span>{averageRating.toFixed(1)}</span>
          </div>
          <div className="course-enrollment">
            <FaUsers className="icon" />
            <span>{enrollmentCount} students</span>
          </div>
          <div className="course-duration">
            <FaClock className="icon" />
            <span>{duration}</span>
          </div>
        </div>
        <div className="course-tags">
          {tags.map((tag, index) => (
            <span key={index} className="course-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CourseCard

