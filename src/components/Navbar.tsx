import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileInvoiceDollar, 
  faCog, 
  faChartBar, 
  faSignOutAlt,
  faTachometerAlt
} from '@fortawesome/free-solid-svg-icons';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const location = useLocation();
  
  // Check if the current path matches the link path
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">Fee Management</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`} 
                to="/dashboard"
              >
                <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/fees/create') ? 'active' : ''}`} 
                to="/fees/create"
              >
                <FontAwesomeIcon icon={faFileInvoiceDollar} className="me-2" />
                Fee Creation
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/settings') ? 'active' : ''}`} 
                to="/settings"
              >
                <FontAwesomeIcon icon={faCog} className="me-2" />
                Settings
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/reports') ? 'active' : ''}`} 
                to="/reports"
              >
                <FontAwesomeIcon icon={faChartBar} className="me-2" />
                Reports
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <button 
              className="btn btn-outline-light" 
              onClick={onLogout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 