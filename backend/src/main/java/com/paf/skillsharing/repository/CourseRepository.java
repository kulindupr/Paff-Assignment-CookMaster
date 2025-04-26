package com.paf.skillsharing.repository;

import com.paf.skillsharing.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CourseRepository extends MongoRepository<Course, String> {
    List<Course> findByInstructorId(String instructorId);
    List<Course> findByTitleContainingIgnoreCase(String title);
    List<Course> findByLevel(String level);
} 