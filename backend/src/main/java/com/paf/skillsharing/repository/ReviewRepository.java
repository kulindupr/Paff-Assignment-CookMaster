package com.paf.skillsharing.repository;

import com.paf.skillsharing.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByCourseId(String courseId);
    List<Review> findByUserId(String userId);
    boolean existsByCourseIdAndUserId(String courseId, String userId);
} 