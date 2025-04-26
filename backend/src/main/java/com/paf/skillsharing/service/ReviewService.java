package com.paf.skillsharing.service;

import com.paf.skillsharing.model.Review;
import com.paf.skillsharing.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getReviewsByCourseId(String courseId) {
        return reviewRepository.findByCourseId(courseId);
    }

    public List<Review> getReviewsByUserId(String userId) {
        return reviewRepository.findByUserId(userId);
    }

    public Review createReview(Review review) {
        if (reviewRepository.existsByCourseIdAndUserId(review.getCourse().getId(), review.getUser().getId())) {
            throw new IllegalArgumentException("User has already reviewed this course");
        }
        return reviewRepository.save(review);
    }

    public void deleteReview(String reviewId) {
        reviewRepository.deleteById(reviewId);
    }
} 