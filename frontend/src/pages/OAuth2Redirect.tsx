import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OAuth2Redirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuth2Redirect = async () => {
      try {
        const response = await axios.get('http://localhost:8080/oauth2/success');
        const token = response.data;
        
        // Store the token in localStorage
        localStorage.setItem('token', token);
        
        // Redirect to home page
        navigate('/');
      } catch (error) {
        console.error('OAuth2 error:', error);
        navigate('/login?error=oauth_failed');
      }
    };

    handleOAuth2Redirect();
  }, [navigate]);

  return (
    <div className="oauth2-redirect">
      <h2>Completing login...</h2>
    </div>
  );
};

export default OAuth2Redirect; 