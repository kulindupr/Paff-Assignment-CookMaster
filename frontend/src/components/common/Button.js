"use client"
import { Link } from "react-router-dom"
import "../../styles/Button.css"

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  to,
  href,
  className = "",
  ...props
}) => {
  const buttonClasses = `
    button 
    ${variant} 
    ${size} 
    ${fullWidth ? "full-width" : ""} 
    ${loading ? "loading" : ""} 
    ${className}
  `

  // Render as Link if 'to' prop is provided
  if (to) {
    return (
      <Link to={to} className={buttonClasses} {...props}>
        {loading ? <span className="button-spinner"></span> : children}
      </Link>
    )
  }

  // Render as anchor if 'href' prop is provided
  if (href) {
    return (
      <a href={href} className={buttonClasses} {...props}>
        {loading ? <span className="button-spinner"></span> : children}
      </a>
    )
  }

  // Render as button by default
  return (
    <button type={type} className={buttonClasses} disabled={disabled || loading} onClick={onClick} {...props}>
      {loading ? <span className="button-spinner"></span> : children}
    </button>
  )
}

export default Button

