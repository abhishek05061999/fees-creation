import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{username?: string; password?: string}>({});
  const [loading, setLoading] = useState(false);

  // Constants for validation
  const USERNAME_MIN_LENGTH = 5;
  const PASSWORD_MIN_LENGTH = 6;

  const validateForm = () => {
    const newErrors: {username?: string; password?: string} = {};
    
    // Validate username
    if (!username) {
      newErrors.username = 'Username is required';
    } else if (username.length < USERNAME_MIN_LENGTH) {
      newErrors.username = `Username must be at least ${USERNAME_MIN_LENGTH} characters`;
    }
    
    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < PASSWORD_MIN_LENGTH) {
      newErrors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 1500);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue to Fee Management System</p>
        </div>
        
        <div className="login-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label htmlFor="username" className="form-label">
                <FontAwesomeIcon icon={faUser} className="me-2" />
                Username
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="username"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errors.username) {
                      setErrors({...errors, username: undefined});
                    }
                  }}
                />
              </div>
              {errors.username && (
                <div className="invalid-feedback d-block">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
                  {errors.username}
                </div>
              )}
              <div className="form-text">
                Username must be at least {USERNAME_MIN_LENGTH} characters
              </div>
            </div>
            
            <div className="form-group mb-4">
              <label htmlFor="password" className="form-label">
                <FontAwesomeIcon icon={faLock} className="me-2" />
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors({...errors, password: undefined});
                    }
                  }}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {errors.password && (
                <div className="invalid-feedback d-block">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
                  {errors.password}
                </div>
              )}
              <div className="form-text">
                Password must be at least {PASSWORD_MIN_LENGTH} characters
              </div>
            </div>
            
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="remember" />
                <label className="form-check-label" htmlFor="remember">Remember me</label>
              </div>
              <button 
                type="button" 
                className="forgot-password-btn"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </button>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="mb-0">
              Don't have an account? 
              <Link to="/register" className="register-link"> Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 