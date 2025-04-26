"use client"
import { Link } from "react-router-dom"
import { FaExclamationTriangle, FaHome, FaArrowLeft } from "react-icons/fa"
import "../styles/NotFoundPage.css"

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-icon">
          <FaExclamationTriangle />
        </div>

        <h1>404</h1>
        <h2>Page Not Found</h2>

        <p>The page you are looking for doesn't exist or has been moved.</p>

        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            <FaHome />
            <span>Go to Home</span>
          </Link>

          <button className="btn btn-secondary" onClick={() => window.history.back()}>
            <FaArrowLeft />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage

