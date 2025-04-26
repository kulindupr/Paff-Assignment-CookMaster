"use client"

import React from 'react';
import { FaStar } from 'react-icons/fa';
import "../../styles/ReviewList.css"

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="no-reviews">
        <p>No reviews yet. Be the first to review this course!</p>
      </div>
    );
  }

  return (
    <div className="reviews-list">
      {reviews.map((review) => (
        <div key={review.id} className="review-card">
          <div className="review-header">
            <img 
              src={review.userImage} 
              alt={review.userName} 
              className="reviewer-avatar"
            />
            <div className="reviewer-info">
              <h4>{review.userName}</h4>
              <div className="review-meta">
                <div className="review-rating">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      color={index < review.rating ? '#ffc107' : '#e4e5e9'}
                      size={16}
                    />
                  ))}
                </div>
                <span className="review-date">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="review-content">
            <p>{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList

