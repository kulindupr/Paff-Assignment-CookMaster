"use client"

import { useState } from "react"
import { FaStar, FaRegStar, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa"
import { formatRelativeTime } from "../../utils/formatters"
import useAuth from "../../hooks/useAuth"
import reviewService from "../../services/reviewService"
import "../../styles/ReviewItem.css"

const ReviewItem = ({ review, onUpdate, onDelete }) => {
  const { currentUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editedRating, setEditedRating] = useState(review.rating)
  const [editedComment, setEditedComment] = useState(review.comment)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")

  const isOwner = currentUser && currentUser._id === review.userId

  const handleEditClick = () => {
    setIsEditing(true)
    setEditedRating(review.rating)
    setEditedComment(review.comment)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setError("")
  }

  const handleSaveEdit = async () => {
    if (editedRating === 0) {
      setError("Please select a rating")
      return
    }

    try {
      const updatedReview = await reviewService.updateReview(review._id, {
        rating: editedRating,
        comment: editedComment,
      })

      setIsEditing(false)
      setError("")

      if (onUpdate) {
        onUpdate(updatedReview)
      }
    } catch (err) {
      setError(err.message || "Failed to update review")
    }
  }

  const handleDeleteClick = () => {
    setIsDeleting(true)
  }

  const handleConfirmDelete = async () => {
    try {
      await reviewService.deleteReview(review._id)

      if (onDelete) {
        onDelete(review._id)
      }
    } catch (err) {
      setError(err.message || "Failed to delete review")
    }
  }

  const handleCancelDelete = () => {
    setIsDeleting(false)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index}>{index < rating ? <FaStar className="star filled" /> : <FaRegStar className="star" />}</span>
    ))
  }

  const renderRatingInput = () => {
    return (
      <div className="rating-input">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setEditedRating(star)}
            className={star <= editedRating ? "star filled" : "star"}
          >
            {star <= editedRating ? <FaStar /> : <FaRegStar />}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="review-item">
      {error && <div className="review-error">{error}</div>}

      <div className="review-header">
        <div className="reviewer-info">
          <img
            src={review.userProfilePicture || "/placeholder.svg?height=40&width=40"}
            alt={review.userName}
            className="reviewer-avatar"
          />
          <div className="reviewer-details">
            <h4 className="reviewer-name">{review.userName}</h4>
            <span className="review-date">{formatRelativeTime(review.createdAt)}</span>
          </div>
        </div>

        {isOwner && !isEditing && !isDeleting && (
          <div className="review-actions">
            <button className="edit-button" onClick={handleEditClick} aria-label="Edit review">
              <FaEdit />
            </button>
            <button className="delete-button" onClick={handleDeleteClick} aria-label="Delete review">
              <FaTrash />
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="review-edit-form">
          {renderRatingInput()}

          <textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            rows={4}
            placeholder="Write your review..."
          />

          <div className="edit-actions">
            <button className="cancel-button" onClick={handleCancelEdit}>
              <FaTimes />
              <span>Cancel</span>
            </button>
            <button className="save-button" onClick={handleSaveEdit}>
              <FaCheck />
              <span>Save</span>
            </button>
          </div>
        </div>
      ) : isDeleting ? (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this review?</p>
          <div className="delete-actions">
            <button className="cancel-button" onClick={handleCancelDelete}>
              <FaTimes />
              <span>Cancel</span>
            </button>
            <button className="confirm-button" onClick={handleConfirmDelete}>
              <FaCheck />
              <span>Delete</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="review-rating">{renderStars(review.rating)}</div>
          <div className="review-content">{review.comment}</div>
        </>
      )}
    </div>
  )
}

export default ReviewItem

