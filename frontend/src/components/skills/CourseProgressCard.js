import { Link } from "react-router-dom"
import { FaPlay } from "react-icons/fa"
import "../../styles/CourseProgressCard.css"

const CourseProgressCard = ({ progress }) => {
  const { course, completedLessons, totalLessons, lastAccessedAt } = progress
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100) || 0

  return (
    <div className="course-progress-card">
      <div className="course-thumbnail">
        <img src={course.thumbnail || "/placeholder.svg?height=150&width=250"} alt={course.title} />
        <div className="course-level">{course.level}</div>
      </div>

      <div className="course-info">
        <h3 className="course-title">
          <Link to={`/courses/${course._id}`}>{course.title}</Link>
        </h3>

        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <span className="progress-text">{progressPercentage}% complete</span>
        </div>

        <div className="progress-stats">
          <span>
            {completedLessons} of {totalLessons} lessons completed
          </span>
        </div>
      </div>

      <div className="course-actions">
        <Link to={`/courses/${course._id}/learn`} className="continue-button">
          <FaPlay />
          <span>Continue</span>
        </Link>
      </div>
    </div>
  )
}

export default CourseProgressCard

