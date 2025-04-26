import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

interface User {
  name: string;
  email: string;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user in localStorage on component mount and when localStorage changes
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    // Initial check
    checkUser();

    // Add event listener for storage changes
    window.addEventListener('storage', checkUser);

    // Cleanup
    return () => {
      window.removeEventListener('storage', checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">Cook Master</div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        {!user ? (
          <>
            <Link to="/signup" className="nav-link">Sign Up</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </>
        ) : (
          <>
            <span className="nav-link">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="nav-link logout-button">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 