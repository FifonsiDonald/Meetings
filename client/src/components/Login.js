import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Login.module.css';
import BACKEND_API_URL from '../utils/config';
import { useNavigate } from 'react-router-dom';


const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BACKEND_API_URL+'/auth/login', { 
        username,
        password, 
      });
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);
      console.log(res);
    } catch (error) {
      console.error(error);
      
      alert('Login failed');
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>MyMeetings</h2>
        <input
          className={styles.inputField}
          type="text"
          value={username}
          placeholder="UserName"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className={styles.inputField}
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles.loginButton} type="submit">login</button>
        <p className="auth-link-text">
        Don't have an account?{' '}
        <span
          onClick={() => navigate('/')}
          className="auth-link"
        >
          Register here
        </span>
      </p>
      </form>
      
    </div>
  );
};

export default Login;
