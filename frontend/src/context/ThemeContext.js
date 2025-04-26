"use client"

import { createContext, useState, useEffect } from "react"

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setDarkMode(savedTheme === "dark")
    } else {
      // Check if user prefers dark mode at OS level
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      setDarkMode(prefersDarkMode)
    }
  }, [])

  useEffect(() => {
    // Apply theme to document
    if (darkMode) {
      document.documentElement.classList.add("dark-mode")
    } else {
      document.documentElement.classList.remove("dark-mode")
    }

    // Save theme preference
    localStorage.setItem("theme", darkMode ? "dark" : "light")
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  const value = {
    darkMode,
    toggleTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

