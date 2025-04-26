"use client"

import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { courses } from '../data/coursesData';
import '../styles/CoursesPage.css';

const CoursesPage = () => {
  return (
    <div className="courses-page">
      <div className="courses-header">
        <h1>Explore Our Cooking Courses</h1>
        <p>Discover a world of culinary knowledge with our expert-led courses</p>
      </div>

      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <img
              src={course.image}
              alt={course.title}
              className="course-image"
            />
            <div className="course-content">
              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">{course.description}</p>
              <div className="course-rating">
                <div className="rating-stars">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      color={index < Math.floor(course.rating) ? '#ffc107' : '#e4e5e9'}
                    />
                  ))}
                </div>
                <span className="rating-value">{course.rating}</span>
              </div>
              <Link to={`/courses/${course.id}`} className="view-more-btn">
                View Course
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;

