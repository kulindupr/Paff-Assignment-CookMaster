"use client"

import { useState } from "react"
import { FaStar } from "react-icons/fa"
import useAuth from "../../hooks/useAuth"
import reviewService from "../../services/reviewService"
import "../../styles/ReviewForm.css"

const ReviewForm = ({ courseId, onReviewSubmitted }) => {
  const { currentUser } = useAuth()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleRatingChange = (newRating) => {
    setRating(newRating)
  }

  const handleMouseEnter = (starIndex) => {
    setHoverRating(starIndex)
  }

  const handleMouseLeave = () => {
    setHoverRating(0)
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!currentUser) {
      setError("You must be logged in to submit a review")
      return
    }

    if (rating === 0) {
      setError("Please select a rating")
      return
    }

    try {
      setSubmitting(true)
      setError("")

      const reviewData = {
        rating,
        comment,
      }

      const newReview = await reviewService.createReview(courseId, reviewData)
      setRating(0)
      setComment("")
      onReviewSubmitted(newReview)
    } catch (err) {
      setError(err.message || "Failed to submit review. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="review-form-container">
      <h3>Write a Review</h3>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="review-form">
        <div className="rating-container">
          <p>Your Rating:</p>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <FaStar
                key={starIndex}
                className={`star ${(hoverRating || rating) >= starIndex ? "filled" : ""}`}
                onClick={() => handleRatingChange(starIndex)}
                onMouseEnter={() => handleMouseEnter(starIndex)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
        </div>

        <div className="comment-container">
          <label htmlFor="review-comment">Your Review:</label>
          <textarea
            id="review-comment"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Share your experience with this course..."
            rows={4}
            required
          />
        </div>

        <button type="submit" className="submit-button" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  )
}

export default ReviewForm

