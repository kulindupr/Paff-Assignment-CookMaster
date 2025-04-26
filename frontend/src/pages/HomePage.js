import { Link } from "react-router-dom"
import { FaGraduationCap, FaUsers, FaCertificate, FaUtensils } from "react-icons/fa"
import "../styles/HomePage.css"
import {assets} from '../Assets/assests'

const HomePage = () => {
  const features = [
    {
      icon: <FaGraduationCap />,
      title: "Structured Learning",
      description: "Follow a clear path from beginner to advanced cooking skills with our curated courses.",
    },
    {
      icon: <FaUsers />,
      title: "Community Engagement",
      description: "Connect with fellow cooking enthusiasts, share experiences, and learn together.",
    },
    {
      icon: <FaCertificate />,
      title: "Earn Certificates",
      description: "Get recognized for your culinary achievements with official certificates.",
    },
    {
      icon: <FaUtensils />,
      title: "Track Progress",
      description: "Monitor your learning journey and showcase your growing cooking skills.",
    },
  ]

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <video className="hero-video" src={assets.cook} autoPlay loop muted></video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Master the Art of Cooking</h1>
          <p>Learn, share, and improve your culinary skills with our structured courses and supportive community.</p>
          <div className="hero-buttons">
            <Link to="/courses" className="btn btn-primary">
              Explore Courses
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Join Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Cook Master?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="popular-courses-section">
  <h2>Popular Courses</h2>
  <div className="courses-preview">
    {[1, 2, 3].map((item) => (
      <div key={item} className="course-preview-card">
        <div className="course-video">
          <video
            src={assets[`course${item}`]} // Reference the corresponding video for each course
            alt={`Course ${item}`}
            width="100%"
            height="200"
            autoPlay   // Ensure the video auto plays
            loop       // Ensure the video loops
            muted      // Mute the video to avoid sound playing
            playsInline // Ensure it plays inline on mobile devices
          />
        </div>
        <div className="course-info">
          <h3>Cooking Course {item}</h3>
          <p>Learn the fundamentals of cooking with our expert instructors.</p>
          <Link to={`/courses/${item}`} className="btn btn-sm">
            View Details
          </Link>
        </div>
      </div>
    ))}
  </div>
  <div className="view-all-link">
    <Link to="/courses">View All Courses</Link>
  </div>
</section>


      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-container">
          {[
            {
              name: "Jane Doe",
              role: "Home Cook",
              content:
                "Cook Master has transformed my cooking skills. The structured courses and supportive community have made learning enjoyable and effective.",
              image: require('../Assets/jane.avif')
            },
            {
              name: "John Smith",
              role: "Aspiring Chef",
              content:
                "The certification program has given me credibility in my job search. I've learned techniques I wouldn't have discovered on my own.",
              image: require('../Assets/john.avif')
            },
            {
              name: "Emily Johnson",
              role: "Food Blogger",
              content:
                "The platform's social features have connected me with like-minded food enthusiasts. I love sharing my progress and getting feedback.",
              image: require('../Assets/emily.jpeg')
            },
          ].map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-content">"{testimonial.content}"</div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img
                    src={testimonial.image}

                    alt={testimonial.name}
                  />
                </div>
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Start Your Culinary Journey?</h2>
        <p>Join thousands of cooking enthusiasts learning and sharing on Cook Master.</p>
        <Link to="/register" className="btn btn-primary btn-lg">
          Sign Up Now
        </Link>
      </section>
    </div>
  )
}

export default HomePage

