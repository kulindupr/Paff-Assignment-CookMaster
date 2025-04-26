"use client"
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"
import "../../styles/Rating.css"

const Rating = ({ value, max = 5, size = "medium", interactive = false, onChange }) => {
  const getStars = () => {
    const stars = []

    // Calculate full and partial stars
    const fullStars = Math.floor(value)
    const hasHalfStar = value % 1 >= 0.5

    for (let i = 1; i <= max; i++) {
      if (i <= fullStars) {
        stars.push({ type: "full", value: i })
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push({ type: "half", value: i })
      } else {
        stars.push({ type: "empty", value: i })
      }
    }

    return stars
  }

  const handleStarClick = (starValue) => {
    if (interactive && onChange) {
      onChange(starValue)
    }
  }

  return (
    <div className={`rating ${size} ${interactive ? "interactive" : ""}`}>
      {getStars().map((star, index) => (
        <span
          key={index}
          className="star"
          onClick={() => handleStarClick(star.value)}
          role={interactive ? "button" : undefined}
          tabIndex={interactive ? 0 : undefined}
        >
          {star.type === "full" && <FaStar />}
          {star.type === "half" && <FaStarHalfAlt />}
          {star.type === "empty" && <FaRegStar />}
        </span>
      ))}
    </div>
  )
}

export default Rating

