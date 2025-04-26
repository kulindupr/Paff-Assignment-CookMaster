"use client"

import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import '../styles/CoursesPage.css';

const CoursesPage = () => {
  // Sample course data
  const courses = [
    {
      id: 1,
      title: "Italian Cuisine Masterclass",
      description: "Learn authentic Italian cooking techniques from pasta making to traditional sauces. Perfect for beginners and intermediate cooks.",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 2,
      title: "Baking Fundamentals",
      description: "Master the art of baking with this comprehensive course covering bread, pastries, and desserts.",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      title: "Asian Street Food",
      description: "Explore the vibrant flavors of Asian street food, from Thai to Japanese cuisine.",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 4,
      title: "Healthy Meal Prep",
      description: "Learn how to prepare nutritious and delicious meals for the week ahead.",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 5,
      title: "Vegan Cooking",
      description: "Discover how to create flavorful vegan dishes that will impress everyone.",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 6,
      title: "Wine and Food Pairing",
      description: "Learn the art of pairing wine with food to enhance your dining experience.",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1510812431401-41d39bd2dc46?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
  ];

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

