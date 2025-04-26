import { Link } from "react-router-dom"
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"
import "../../styles/Footer.css"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <img src="/assets/images/logo.png" alt="Cook Master" />
            <h2>Cook Master</h2>
            <p>Learn, share, and improve your culinary skills</p>
          </div>

          <div className="footer-links">
            <div className="footer-links-column">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/courses">Courses</Link>
                </li>
                <li>
                  <Link to="/news-feed">News Feed</Link>
                </li>
                <li>
                  <Link to="/skills-dashboard">Skills Dashboard</Link>
                </li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3>Support</h3>
              <ul>
                <li>
                  <Link to="/faq">FAQ</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/help">Help Center</Link>
                </li>
                <li>
                  <Link to="/feedback">Feedback</Link>
                </li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3>Legal</h3>
              <ul>
                <li>
                  <Link to="/terms">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/cookies">Cookie Policy</Link>
                </li>
                <li>
                  <Link to="/copyright">Copyright</Link>
                </li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3>Contact</h3>
              <ul className="contact-info">
                <li>
                  <FaEnvelope />
                  <a href="mailto:info@cookmaster.com">info@cookmaster.com</a>
                </li>
                <li>
                  <FaPhone />
                  <a href="tel:+1234567890">+1 (234) 567-890</a>
                </li>
                <li>
                  <FaMapMarkerAlt />
                  <span>123 Culinary St, Foodville, FC 12345</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>

          <div className="copyright">
            <p>&copy; {currentYear} Cook Master. All rights reserved.</p>
          </div>

          <div className="footer-app-links">
            <a href="#" className="app-link">
              <img src="/assets/images/app-store.png" alt="Download on App Store" />
            </a>
            <a href="#" className="app-link">
              <img src="/assets/images/google-play.png" alt="Get it on Google Play" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

