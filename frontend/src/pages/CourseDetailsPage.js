import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaClock, FaUser, FaCertificate, FaUtensils, FaBook, FaVideo, FaGraduationCap, FaCheck } from 'react-icons/fa';
import '../styles/CourseDetailsPage.css';

const CourseDetailsPage = () => {
  const { id } = useParams();
  
  // Detailed sample data for Italian Cuisine Masterclass
  const course = {
    id: 1,
    title: "Italian Cuisine Masterclass",
    description: "Master the art of authentic Italian cooking with our comprehensive course",
    longDescription: "This immersive course takes you on a culinary journey through Italy's rich gastronomic heritage. You'll learn traditional techniques, authentic recipes, and the secrets behind Italy's most beloved dishes. From handmade pasta to perfect risotto, this course covers everything you need to become a master of Italian cuisine.",
    rating: 4.8,
    totalStudents: 1250,
    duration: "8 weeks",
    level: "Intermediate",
    price: "$199",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    features: [
      { icon: <FaUtensils />, text: "40+ Video Lessons" },
      { icon: <FaBook />, text: "100+ Recipes" },
      { icon: <FaVideo />, text: "Lifetime Access" },
      { icon: <FaGraduationCap />, text: "Certificate" }
    ],
    whatYouWillLearn: [
      "Master the art of making fresh pasta from scratch",
      "Create authentic Italian sauces and condiments",
      "Perfect the technique of making risotto",
      "Learn traditional Italian meat and seafood preparation",
      "Understand regional Italian cooking variations",
      "Develop plating and presentation skills",
      "Learn wine pairing with Italian dishes",
      "Master Italian dessert making"
    ],
    sampleRecipes: [
      {
        name: "Handmade Tagliatelle with Bolognese",
        description: "Learn to make fresh tagliatelle pasta and authentic Bolognese sauce",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        name: "Risotto alla Milanese",
        description: "Classic saffron-infused risotto with bone marrow",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        name: "Tiramisu Classico",
        description: "Traditional Italian coffee-flavored dessert",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      }
    ],
    instructor: {
      name: "Chef Marco Rossi",
      bio: "With over 15 years of experience in Italian cuisine, Chef Marco has worked in Michelin-starred restaurants across Italy, including Osteria Francescana and La Pergola. He brings his expertise and passion for authentic Italian cooking to this comprehensive course.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      specialties: ["Pasta Making", "Risotto", "Traditional Sauces", "Italian Desserts"],
      experience: [
        "Head Chef at Osteria Francescana (2015-2018)",
        "Sous Chef at La Pergola (2012-2015)",
        "Guest Chef at various Michelin-starred restaurants",
        "Italian Cuisine Consultant for international hotels"
      ]
    },
    curriculum: [
      {
        week: 1,
        title: "Introduction to Italian Cuisine",
        topics: [
          "History and regional variations",
          "Essential Italian ingredients",
          "Basic cooking techniques",
          "Kitchen setup and tools"
        ],
        duration: "2 hours",
        lessons: [
          "Understanding Italian culinary regions",
          "Essential pantry items",
          "Basic knife skills",
          "Cooking with olive oil"
        ]
      },
      {
        week: 2,
        title: "Pasta Making Mastery",
        topics: [
          "Fresh pasta dough techniques",
          "Traditional pasta shapes",
          "Stuffed pasta varieties",
          "Perfect pasta cooking methods"
        ],
        duration: "3 hours",
        lessons: [
          "Making fresh egg pasta",
          "Shaping tagliatelle and pappardelle",
          "Creating stuffed ravioli",
          "Perfect pasta cooking techniques"
        ]
      },
      {
        week: 3,
        title: "Sauces and Condiments",
        topics: [
          "Classic tomato sauces",
          "Cream-based sauces",
          "Pesto variations",
          "Traditional Italian condiments"
        ],
        duration: "2.5 hours",
        lessons: [
          "Authentic Bolognese sauce",
          "Traditional pesto Genovese",
          "Creamy Alfredo sauce",
          "Basic tomato sauce"
        ]
      },
      {
        week: 4,
        title: "Meat and Seafood",
        topics: [
          "Italian meat preparation",
          "Traditional seafood dishes",
          "Cooking with game",
          "Perfect pairings"
        ],
        duration: "3 hours",
        lessons: [
          "Osso Buco preparation",
          "Traditional seafood risotto",
          "Game meat cooking techniques",
          "Wine pairing with meats"
        ]
      },
      {
        week: 5,
        title: "Risotto and Polenta",
        topics: [
          "Perfect risotto technique",
          "Traditional polenta preparation",
          "Regional variations",
          "Creative toppings"
        ],
        duration: "2 hours",
        lessons: [
          "Risotto alla Milanese",
          "Traditional polenta preparation",
          "Modern risotto variations",
          "Polenta toppings and accompaniments"
        ]
      },
      {
        week: 6,
        title: "Italian Desserts",
        topics: [
          "Tiramisu masterclass",
          "Traditional cannoli",
          "Gelato making",
          "Italian pastries"
        ],
        duration: "2.5 hours",
        lessons: [
          "Classic Tiramisu",
          "Sicilian cannoli",
          "Homemade gelato",
          "Traditional Italian cookies"
        ]
      }
    ],
    certificate: {
      title: "Italian Cuisine Master Certificate",
      description: "This prestigious certificate is awarded upon successful completion of all course modules, practical assignments, and final assessment. It recognizes your mastery of authentic Italian cooking techniques and recipes.",
      image: "https://images.unsplash.com/photo-1589330694653-a3c8b7b1c0e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      benefits: [
        "Recognized by Italian culinary institutions",
        "Valid for professional development",
        "Can be shared on LinkedIn and professional networks",
        "Access to exclusive alumni network",
        "Eligibility for advanced courses"
      ]
    },
    requirements: [
      "Basic cooking experience",
      "Access to standard kitchen equipment",
      "Willingness to learn and practice",
      "Passion for Italian cuisine",
      "Basic understanding of cooking terms",
      "Access to quality ingredients"
    ],
    testimonials: [
      {
        name: "Sarah Johnson",
        role: "Home Chef",
        text: "This course transformed my cooking! The techniques I learned are now part of my daily cooking routine. The pasta-making module was particularly valuable.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        name: "Michael Chen",
        role: "Restaurant Owner",
        text: "As a professional chef, I found the advanced techniques and traditional methods incredibly valuable. The course helped me elevate my Italian menu.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        name: "Emma Rodriguez",
        role: "Culinary Student",
        text: "The course structure is perfect for both beginners and experienced cooks. The video demonstrations are clear and the recipes are authentic.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      }
    ]
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
                {feature.icon}
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