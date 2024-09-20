import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthSuccess = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from URL
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (token) {
      // Save token to localStorage
      localStorage.setItem('token', token);

      // Set login state to true
      setIsLoggedIn(true);

      // Redirect to the home page
      navigate('/home');
    } else {
      // If no token is present, redirect to login
      navigate('/');
    }
  }, [navigate, setIsLoggedIn]);

  return <div>Redirecting...</div>;
};

export default OAuthSuccess;
