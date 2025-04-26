"use client"

import { useState } from "react"
import ReviewItem from "./ReviewItem"
import Pagination from "../common/Pagination"
import "../../styles/ReviewList.css"

const ReviewList = ({ reviews, onReviewUpdate, onReviewDelete }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const reviewsPerPage = 5

  // Get current reviews
  const indexOfLastReview = currentPage * reviewsPerPage
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    // Scroll to top of review list
    document.querySelector(".review-list-container").scrollIntoView({ behavior: "smooth" })
  }

  if (reviews.length === 0) {
    return (
      <div className="no-reviews">
        <p>No reviews yet. Be the first to review this course!</p>
      </div>
    )
  }

  return (
    <div className="review-list-container">
      <h3>Student Reviews ({reviews.length})</h3>

      <div className="review-list">
        {currentReviews.map((review) => (
          <ReviewItem key={review._id} review={review} onUpdate={onReviewUpdate} onDelete={onReviewDelete} />
        ))}
      </div>

      {reviews.length > reviewsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(reviews.length / reviewsPerPage)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default ReviewList

