import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import WarmupGuide from "./pages/WarmupGuide";
import ExperienceLevel from "./pages/ExperienceLevel";
import PPLWorkout from "./pages/PPLWorkout";
import BMICalculator from "./pages/BMICalculator";
import BurnWaterCalculator from "./pages/BurnWaterCalculator";
import AdminDashboard from "./pages/AdminDashboard";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { isLoggedIn, getRole, logout } from "./utils/auth";

/* ✅ Route Guards */
function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  if (!isLoggedIn()) return <Navigate to="/login" replace />;
  return getRole() === "admin" ? children : <Navigate to="/home" replace />;
}

/* ✅ Landing logic (root path) */
function Landing() {
  if (!isLoggedIn()) return <Navigate to="/login" replace />;
  return getRole() === "admin" ? <Navigate to="/admin" replace /> : <Navigate to="/home" replace />;
}

/* ✅ Navbar visible ONLY after login */
function Navbar() {
  if (!isLoggedIn()) return null;

  const role = getRole();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo always goes to landing (role redirect) */}
        <Link to="/" className="navbar-logo">💪 GymFit Pro</Link>

        <ul className="nav-menu">
          {role === "user" && (
            <>
              <li className="nav-item"><Link to="/home" className="nav-link">Home</Link></li>
              <li className="nav-item"><Link to="/warmup" className="nav-link">Warm-Up</Link></li>
              <li className="nav-item"><Link to="/experience" className="nav-link">Experience</Link></li>
              <li className="nav-item"><Link to="/workout" className="nav-link">Workouts</Link></li>
              <li className="nav-item"><Link to="/bmi" className="nav-link">BMI</Link></li>
              <li className="nav-item"><Link to="/calculator" className="nav-link">Burn & Water</Link></li>
            </>
          )}

          {role === "admin" && (
            <li className="nav-item">
              <Link to="/admin" className="nav-link">Admin Dashboard</Link>
            </li>
          )}

          <li className="nav-item">
            <button
              className="btn btn-secondary"
              onClick={() => {
                logout();
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          {/* ✅ Root decides where to go */}
          <Route path="/" element={<Landing />} />

          {/* ✅ Auth pages shown only before login */}
          <Route path="/login" element={isLoggedIn() ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/signup" element={isLoggedIn() ? <Navigate to="/" replace /> : <Signup />} />

          {/* ✅ User pages */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/warmup" element={<ProtectedRoute><WarmupGuide /></ProtectedRoute>} />
          <Route path="/experience" element={<ProtectedRoute><ExperienceLevel /></ProtectedRoute>} />
          <Route path="/workout" element={<ProtectedRoute><PPLWorkout /></ProtectedRoute>} />
          <Route path="/bmi" element={<ProtectedRoute><BMICalculator /></ProtectedRoute>} />
          <Route path="/calculator" element={<ProtectedRoute><BurnWaterCalculator /></ProtectedRoute>} />

          {/* ✅ Admin page */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

          {/* ✅ Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
