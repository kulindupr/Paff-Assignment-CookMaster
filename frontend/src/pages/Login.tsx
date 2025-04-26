import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const validateForm = () => {
    // Check if all fields are filled
    if (!formData.email || !formData.password) {
      setError('All fields are required');
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
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
      // Make API call to backend for login
      const response = await axios.post('http://localhost:8080/api/users/login', formData);
      
      if (response.status === 200) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        toast.success('Login successful! Welcome back!');
        
        // Clear form data
        setFormData({
          email: '',
          password: ''
        });
        
        // Redirect to home page after successful login
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Invalid email or password';
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
    <div className="login-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="login-form">
        <h2>Login</h2>
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
            Login with Google
          </button>
          
          <button className="facebook-button">
            <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="social-icon" />
            Login with Facebook
          </button>
        </div>

        <div className="divider">
          <span>OR</span>
        </div>

        <form onSubmit={handleSubmit}>
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
            />
          </div>
          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
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
            Login with Google
          </button>
          
          <p className="signup-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login; 