package com.paf.skillsharing.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "reviews")
public class Review {
    @Id
    private String id;

    @DBRef
    private Course course;

    @DBRef
    private User user;

    private Integer rating;
    private String comment;
    private LocalDateTime createdAt = LocalDateTime.now();
} 