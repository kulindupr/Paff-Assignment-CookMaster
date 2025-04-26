import { FaExclamationTriangle } from "react-icons/fa"
import "../../styles/ErrorMessage.css"

const ErrorMessage = ({ message, fullPage = false }) => {
  const errorClasses = `error-message ${fullPage ? "full-page" : ""}`

  return (
    <div className={errorClasses}>
      <FaExclamationTriangle className="error-icon" />
      <p>{message || "An error occurred. Please try again."}</p>
    </div>
  )
}

export default ErrorMessage

