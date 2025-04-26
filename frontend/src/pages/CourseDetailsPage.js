import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaClock, FaCertificate, FaUtensils, FaBook, FaVideo, FaGraduationCap } from 'react-icons/fa';
import courseService from '../services/courseService';
import ReviewForm from '../components/review/ReviewForm';
import ReviewList from '../components/review/ReviewList';
import '../styles/CourseDetailsPage.css';

const CourseDetailsPage = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const data = await courseService.getCourseById(id);
                setCourse(data);
            } catch (err) {
                setError('Failed to load course details');
                console.error('Error loading course:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    const handleReviewSubmit = (newReview) => {
        if (course) {
            const totalReviews = course.reviews ? course.reviews.length + 1 : 1;
            const newRating = ((course.rating * (totalReviews - 1)) + newReview.rating) / totalReviews;
            setCourse(prev => ({
                ...prev,
                rating: newRating,
                reviews: [...(prev.reviews || []), newReview]
            }));
        }
    };

    if (loading) {
        return <div className="loading">Loading course details...</div>;
    }

    if (error || !course) {
        return <div className="error">{error || 'Course not found'}</div>;
    }

    return (
        <div className="course-details-page">
            <div className="course-hero">
                <div className="course-hero-content">
                    <h1>{course.title}</h1>
                    <div className="course-meta">
                        <div className="rating">
                            <div className="stars">
                                {[...Array(5)].map((_, index) => (
                                    <FaStar
                                        key={index}
                                        color={index < Math.floor(course.rating) ? '#ffc107' : '#e4e5e9'}
                                    />
                                ))}
                            </div>
                            <span>{course.rating.toFixed(1)} ({course.totalStudents} students)</span>
                        </div>
                        <div className="meta-item">
                            <FaClock />
                            <span>{course.duration}</span>
                        </div>
                        <div className="meta-item">
                            <FaCertificate />
                            <span>Certificate Included</span>
                        </div>
                    </div>
                    <div className="course-features">
                        {course.features.map((feature, index) => (
                            <div key={index} className="feature-item">
                                {feature.icon === 'FaUtensils' && <FaUtensils />}
                                {feature.icon === 'FaBook' && <FaBook />}
                                {feature.icon === 'FaVideo' && <FaVideo />}
                                {feature.icon === 'FaGraduationCap' && <FaGraduationCap />}
                                <span>{feature.text}</span>
                            </div>
                        ))}
                    </div>
                    <div className="course-price">
                        <span className="price">${course.price}</span>
                        <button className="enroll-button">Enroll Now</button>
                    </div>
                </div>
                <img src={course.image} alt={course.title} className="course-hero-image" />
            </div>

            <div className="course-content">
                <div className="course-description">
                    <h2>About This Course</h2>
                    <p>{course.longDescription}</p>
                </div>

                <div className="what-you-will-learn">
                    <h2>What You Will Learn</h2>
                    <div className="learning-points">
                        {course.whatYouWillLearn.map((point, index) => (
                            <div key={index} className="learning-point">
                                <FaStar className="check-icon" />
                                <span>{point}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="course-instructor">
                    <h2>Your Instructor</h2>
                    <div className="instructor-profile">
                        <img src={course.instructor?.image} alt={course.instructor?.name} />
                        <div className="instructor-info">
                            <h3>{course.instructor?.name}</h3>
                            <p>{course.instructor?.bio}</p>
                        </div>
                    </div>
                </div>

                <div className="course-reviews">
                    <h2>Course Reviews</h2>
                    <ReviewList courseId={course.id} />
                    <ReviewForm 
                        courseId={course.id} 
                        onReviewSubmitted={handleReviewSubmit} 
                    />
                </div>
            </div>
        </div>
    );
};

export default CourseDetailsPage; 