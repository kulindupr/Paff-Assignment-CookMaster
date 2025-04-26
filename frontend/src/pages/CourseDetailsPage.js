import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaClock, FaUser, FaCertificate, FaUtensils, FaBook, FaVideo, FaGraduationCap, FaCheck } from 'react-icons/fa';
import { courses } from '../data/coursesData';
import '../styles/CourseDetailsPage.css';

const CourseDetailsPage = () => {
  const { id } = useParams();
  const course = courses.find(course => course.id === parseInt(id));

  if (!course) {
    return <div>Course not found</div>;
  }

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'FaUtensils':
        return <FaUtensils />;
      case 'FaBook':
        return <FaBook />;
      case 'FaVideo':
        return <FaVideo />;
      case 'FaGraduationCap':
        return <FaGraduationCap />;
      default:
        return null;
    }
  };

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
              <span>{course.rating} ({course.totalStudents} students)</span>
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
                {getIconComponent(feature.icon)}
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
          <div className="course-price">
            <span className="price">{course.price}</span>
            <Link to="/enroll" className="enroll-button">
              Enroll Now
            </Link>
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
                <FaCheck className="check-icon" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sample-recipes">
          <h2>Sample Recipes</h2>
          <div className="recipes-grid">
            {course.sampleRecipes.map((recipe, index) => (
              <div key={index} className="recipe-card">
                <img src={recipe.image} alt={recipe.name} />
                <h3>{recipe.name}</h3>
                <p>{recipe.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="course-requirements">
          <h2>Requirements</h2>
          <ul>
            {course.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="course-instructor">
          <h2>Your Instructor</h2>
          <div className="instructor-profile">
            <img src={course.instructor.image} alt={course.instructor.name} />
            <div className="instructor-info">
              <h3>{course.instructor.name}</h3>
              <p>{course.instructor.bio}</p>
              <div className="instructor-specialties">
                <h4>Specialties:</h4>
                <ul>
                  {course.instructor.specialties.map((specialty, index) => (
                    <li key={index}>{specialty}</li>
                  ))}
                </ul>
              </div>
              <div className="instructor-experience">
                <h4>Professional Experience:</h4>
                <ul>
                  {course.instructor.experience.map((exp, index) => (
                    <li key={index}>{exp}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="course-curriculum">
          <h2>Course Curriculum</h2>
          <div className="curriculum-list">
            {course.curriculum.map((week) => (
              <div key={week.week} className="curriculum-item">
                <div className="curriculum-header">
                  <h3>Week {week.week}: {week.title}</h3>
                  <span className="duration">{week.duration}</span>
                </div>
                <div className="curriculum-content">
                  <h4>Topics Covered:</h4>
                  <ul>
                    {week.topics.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                  </ul>
                  <h4>Lessons:</h4>
                  <ul className="lessons-list">
                    {week.lessons.map((lesson, index) => (
                      <li key={index}>{lesson}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="course-certificate">
          <h2>Certificate of Completion</h2>
          <div className="certificate-preview">
            <img src={course.certificate.image} alt={course.certificate.title} />
            <div className="certificate-info">
              <h3>{course.certificate.title}</h3>
              <p>{course.certificate.description}</p>
              <ul className="certificate-benefits">
                {course.certificate.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="course-testimonials">
          <h2>What Students Say</h2>
          <div className="testimonials-grid">
            {course.testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                  <div className="testimonial-author">
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      color={i < testimonial.rating ? '#ffc107' : '#e4e5e9'}
                    />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage; 