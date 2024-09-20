// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // For navigation
// import BACKEND_API_URL from '../utils/config';
// import styles from '../styles/Login.module.css';

// const RegisterPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Use navigate to switch between pages

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       // Make a POST request to your backend's register endpoint
//       const res = await axios.post(BACKEND_API_URL+'/auth/register', { username, password });
      
//       // If successful, redirect to login page
//       navigate('/login');
//     } catch (err) {
//       if (err.response && err.response.data) {
//         setError(err.response.data.msg);
//       } else {
//         setError('An error occurred during registration');
//       }
//     }
//   };

//   const handleGoogleAuth = () => {
//     // Redirect to your backend's Google OAuth route
//     window.location.href = '/auth/google-register';
//   };

//   return (
//     <div className={styles.loginWrapper}>
//       <h2>Register</h2>
      
//       {/* Display error message */}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
      
//       <form className={styles.loginForm} onSubmit={handleRegister}>
//         <div>
//           <label className={styles.formTitle}>Username:</label>
//           <input
//           className={styles.inputField}
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//           className={styles.inputField}
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Register</button>
//       </form>

//       <p>Already have an account? <span onClick={() => navigate('/login')} style={{ color: 'blue', cursor: 'pointer' }}>Login here</span></p>

//       <button onClick={handleGoogleAuth}>Sign in with Google</button>
//     </div>
//   );
// };

// export default RegisterPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/register.css';
import BACKEND_API_URL from '../utils/config';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(BACKEND_API_URL+'/auth/register', { username, password });
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.msg);
      } else {
        setError('An error occurred during registration.');
      }
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = BACKEND_API_URL+'/auth/google-register';
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Register</h2>

      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleRegister} className="auth-form">
        <div className="auth-form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
            required
          />
        </div>
        <div className="auth-form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            required
          />
        </div>
        <button type="submit" className="auth-button">Register</button>
      </form>

      <button onClick={handleGoogleAuth} className="auth-google-button">
        Sign in with Google
      </button>

      <p className="auth-link-text">
        Already have an account?{' '}
        <span
          onClick={() => navigate('/login')}
          className="auth-link"
        >
          Login here
        </span>
      </p>
    </div>
  );
};

export default Register;
