package com.paf.skillsharing.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "courses")
public class Course {
    @Id
    private String id;
    private String title;
    private String description;
    private String longDescription;
    private Double rating;
    private Integer totalStudents;
    private String duration;
    private String level;
    private Double price;
    private String image;
    
    @DBRef
    private List<Review> reviews;
    
    @DBRef
    private User instructor;
    
    private List<String> features;
    private List<String> whatYouWillLearn;
    private List<String> sampleRecipes;
    private List<String> requirements;
    private List<String> curriculum;
} 