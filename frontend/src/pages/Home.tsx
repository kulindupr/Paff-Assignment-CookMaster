import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

interface User {
  name: string;
  email: string;
}

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if no user is logged in
      navigate('/login');
    }
  }, [navigate]);

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="home-container">
      <h1>WELCOME TO THE COOK MASTER!</h1>
      <p className="subtitle">Hello, {user.name}! Your ultimate cooking companion</p>
      <div className="features">
        <div className="feature-card">
          <h3>Explore Recipes</h3>
          <p>Discover thousands of delicious recipes from around the world</p>
        </div>
        <div className="feature-card">
          <h3>Save Favorites</h3>
          <p>Save your favorite recipes and create your personal cookbook</p>
        </div>
        <div className="feature-card">
          <h3>Share with Friends</h3>
          <p>Share your culinary creations with friends and family</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 