import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import all page components
import Home from './pages/Home';
import WarmupGuide from './pages/WarmupGuide';
import ExperienceLevel from './pages/ExperienceLevel';
import PPLWorkout from './pages/PPLWorkout';
import BMICalculator from './pages/BMICalculator';
import BurnWaterCalculator from './pages/BurnWaterCalculator';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo">
              💪 GymFit Pro
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/warmup" className="nav-link">Warm-Up</Link>
              </li>
              <li className="nav-item">
                <Link to="/experience" className="nav-link">Experience</Link>
              </li>
              <li className="nav-item">
                <Link to="/workout" className="nav-link">Workouts</Link>
              </li>
              <li className="nav-item">
                <Link to="/bmi" className="nav-link">BMI</Link>
              </li>
              <li className="nav-item">
                <Link to="/calculator" className="nav-link">Burn & Water</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/warmup" element={<WarmupGuide />} />
          <Route path="/experience" element={<ExperienceLevel />} />
          <Route path="/workout" element={<PPLWorkout />} />
          <Route path="/bmi" element={<BMICalculator />} />
          <Route path="/calculator" element={<BurnWaterCalculator />} />
        </Routes>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-content">
              <h3>GymFit Pro</h3>
              <p>Your Complete Gym Training & Fitness Guide</p>
            </div>
            <div className="footer-links">
              <Link to="/warmup">Warm-Up Guide</Link>
              <Link to="/workout">Workout Plans</Link>
              <Link to="/bmi">BMI Calculator</Link>
              <Link to="/calculator">Burn & Water</Link>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2025 GymFit Pro. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
