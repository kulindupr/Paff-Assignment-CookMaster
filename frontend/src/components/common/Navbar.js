"use client"

import { useState, useEffect } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { FaUser, FaBars, FaTimes, FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa"
import useAuth from "../../hooks/useAuth"
import { useTheme } from "../../hooks/useTheme"
import "../../styles/Navbar.css"
import { PiChefHatDuotone } from "react-icons/pi"

const Navbar = () => {
  const { currentUser, logout } = useAuth()
  const { darkMode, toggleTheme } = useTheme()
  const location = useLocation()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
    setIsProfileMenuOpen(false)
  }, [location])

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  const handleLogout = () => {
    logout()
    setIsProfileMenuOpen(false)
  }

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
        <PiChefHatDuotone className="chef-icon" />
          <span>Cook Master</span>
        </Link>

        <div className="navbar-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <li className="navbar-item">
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/courses" className={({ isActive }) => (isActive ? "active" : "")}>
              Courses
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/news-feed" className={({ isActive }) => (isActive ? "active" : "")}>
              News Feed
            </NavLink>
          </li>
          {currentUser && (
            <li className="navbar-item">
              <NavLink to="/skills-dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                Skills Dashboard
              </NavLink>
            </li>
          )}
        </ul>

        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {currentUser ? (
            <div className="profile-dropdown">
              <button className="profile-button" onClick={toggleProfileMenu}>
                {currentUser.profilePicture ? (
                  <img src={currentUser.profilePicture || "/placeholder.svg"} alt={currentUser.name} />
                ) : (
                  <FaUser />
                )}
              </button>

              {isProfileMenuOpen && (
                <div className="profile-menu">
                  <div className="profile-info">
                    <p className="profile-name">{currentUser.name}</p>
                    <p className="profile-email">{currentUser.email}</p>
                  </div>

                  <ul className="profile-links">
                    <li>
                      <Link to="/profile/me">My Profile</Link>
                    </li>
                    <li>
                      <Link to="/skills-dashboard">Skills Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/create-course">Create Course</Link>
                    </li>
                    <li>
                      <button className="logout-button" onClick={handleLogout}>
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-button">
                Login
              </Link>
              <Link to="/register" className="register-button">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

