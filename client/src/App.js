import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Meetings from './pages/Meetings';
// import Statistics from './pages/Statistics';
import Login from './components/Login';
import './styles/App.css';
import Register from './components/SignUp';
import OAuthSuccess from './components/OAuthSuccess';
import CreateMeeting from './components/CreateMeeting';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if there's a token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
        setIsLoggedIn(true);
    }
}, []);

// On successful login or OAuth callback
const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token); // Store the token
    setIsLoggedIn(true); // Set the user as logged in
};

  return (
    <Router>
      <div className="appLayout">
      {isLoggedIn && <Navbar />}
        <div className="mainContent">
          <Routes>
          <Route
              path="/"
              element={isLoggedIn ? <Navigate to="/home" /> : <Register setIsLoggedIn={setIsLoggedIn}/>}
            />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route
              path="/oauth-success"
              element={<OAuthSuccess setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
            <Route path="/create-meeting" element={isLoggedIn ? <CreateMeeting /> : <Navigate to="/" />} />
            <Route path="/meetings" element={isLoggedIn ? <Meetings /> : <Navigate to="/" />} />
            {/* <Route path="/stats" element={<Statistics />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import Navbar from './components/Navbar';
// // import PrivateRoute from './components/PrivateRoute';
// import Meetings from './pages/Meetings';


// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/Meetings" element={ <Meetings /> } />
//         {/* <Route path="/stats" element={ <Statistics /> } />
//         <Route path="/about" element={<About />} /> */}
//       </Routes>
//     </Router>
//   );
// } 

// export default App;
