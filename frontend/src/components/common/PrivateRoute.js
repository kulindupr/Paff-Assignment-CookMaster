"use client"
import { Navigate, useLocation } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import Loader from "./Loader"

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <Loader />
  }

  if (!currentUser) {
    // Redirect to login page but save the current location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default PrivateRoute

