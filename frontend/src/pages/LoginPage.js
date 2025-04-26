"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import "../styles/AuthPages.css"

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login, currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (currentUser) {
      navigate("/")
    }
  }, [currentUser, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Email and password are required")
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setError("")
      setIsLoading(true)

      await login(formData.email, formData.password)

      // Redirect will happen in useEffect
    } catch (err) {
      // Handle backend error messages
      if (err.response && err.response.data) {
        // If the backend returns a string error message
        if (typeof err.response.data === 'string') {
          setError(err.response.data)
        } 
        // If the backend returns an object with a message property
        else if (err.response.data.message) {
          setError(err.response.data.message)
        }
        // If the backend returns an object with multiple error messages
        else if (typeof err.response.data === 'object') {
          const errorMessages = Object.values(err.response.data).flat()
          setError(errorMessages.join(', '))
        }
      } else {
        // Fallback error message
        setError(err.message || "Failed to login. Please try again.")
      }
      setIsLoading(false)
    }
  }

  const handleOAuthLogin = (provider) => {
    // This would be implemented with your OAuth provider
    console.log(`Login with ${provider}`)
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to continue your culinary journey</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

