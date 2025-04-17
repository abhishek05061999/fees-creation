import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FeeCreation from './components/FeeCreation';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import './App.css';

const App: React.FC = () => {
  const handleLogout = () => {
    // In a real app, this would handle logout logic
    console.log('User logged out');
    // Then navigate to login page
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Dashboard page */}
          <Route 
            path="/dashboard" 
            element={
              <>
                <Navbar onLogout={handleLogout} />
                <Dashboard />
              </>
            }
          />
          <Route 
            path="/fees/create" 
            element={
              <>
                <Navbar onLogout={handleLogout} />
                <FeeCreation onLogout={handleLogout} />
              </>
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 