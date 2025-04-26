import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGoogleLogin = () => {
    // Redirect to Google OAuth endpoint
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const validateForm = () => {
    // Check if all fields are filled
    if (!formData.name || !formData.phone || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }

    // Validate password length
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      // Prepare user data for backend
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      };

      // Make API call to backend
      const response = await axios.post('http://localhost:8080/api/users', userData);
      
      if (response.status === 200) {
        toast.success('Signup successful! Please login to continue.');
        // Clear form data
        setFormData({
          name: '',
          phone: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        // Redirect to login page after successful signup
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'An error occurred during signup';
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        setError('An unexpected error occurred');
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="signup-form">
        <h2>Sign Up</h2>
        {error && <div className="error-message">{error}</div>}
        
        <div className="social-login-buttons">
          <button 
            type="button" 
            className="google-button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="social-icon"
            />
            Sign up with Google
          </button>
          
          <button className="facebook-button">
            <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="social-icon" />
            Sign up with Facebook
          </button>
        </div>

        <div className="divider">
          <span>OR</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={8}
            />
          </div>
          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
          
          <div className="divider">
            <span>OR</span>
          </div>
          
          <button 
            type="button" 
            className="google-button"
            onClick={handleGoogleLogin}
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="google-icon"
            />
            Sign up with Google
          </button>
          
          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup; 