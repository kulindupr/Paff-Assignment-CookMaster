"use client"

import { createContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import authService from "../services/authService"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decodedToken = jwtDecode(token)
        const currentTime = Date.now() / 1000

        if (decodedToken.exp > currentTime) {
          // Token is still valid
          authService
            .getCurrentUser()
            .then((userData) => {
              setCurrentUser(userData)
              setLoading(false)
            })
            .catch((err) => {
              console.error("Error fetching user data:", err)
              localStorage.removeItem("token")
              setCurrentUser(null)
              setLoading(false)
            })
        } else {
          // Token expired
          localStorage.removeItem("token")
          setCurrentUser(null)
          setLoading(false)
        }
      } catch (err) {
        console.error("Invalid token:", err)
        localStorage.removeItem("token")
        setCurrentUser(null)
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    try {
      setError(null)
      const response = await authService.login(email, password)
      localStorage.setItem("token", response.token)
      setCurrentUser(response.user)
      return response.user
    } catch (err) {
      setError(err.message || "Failed to login")
      throw err
    }
  }

  const register = async (userData) => {
    try {
      setError(null)
      const response = await authService.register(userData)
      localStorage.setItem("token", response.token)
      setCurrentUser(response.user)
      return response.user
    } catch (err) {
      setError(err.message || "Failed to register")
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

