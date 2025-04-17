import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileInvoiceDollar, 
  faCalendarCheck, 
  faTasks, 
  faChevronRight, 
  faPlus, 
  faEdit, 
  faCheckCircle, 
  faList,
  faCog,
  faChartBar,
  faArrowUp,
  faArrowDown,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-welcome">
        <h1 className="welcome-title">Welcome to Fee Management</h1>
        <p className="welcome-subtitle">
          Track, manage, and create fee details efficiently from your dashboard
        </p>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="icon">
            <FontAwesomeIcon icon={faFileInvoiceDollar} />
          </div>
          <div className="stat-title">Total Fees</div>
          <div className="stat-value">24</div>
          <div className="stat-change positive-change">
            <FontAwesomeIcon icon={faArrowUp} /> 12% from last month
          </div>
        </div>

        <div className="stat-card">
          <div className="icon">
            <FontAwesomeIcon icon={faCalendarCheck} />
          </div>
          <div className="stat-title">Active Fee Types</div>
          <div className="stat-value">8</div>
          <div className="stat-change positive-change">
            <FontAwesomeIcon icon={faArrowUp} /> 2 new this month
          </div>
        </div>

        <div className="stat-card">
          <div className="icon">
            <FontAwesomeIcon icon={faTasks} />
          </div>
          <div className="stat-title">Pending Approvals</div>
          <div className="stat-value">3</div>
          <div className="stat-change negative-change">
            <FontAwesomeIcon icon={faArrowDown} /> 5 less than yesterday
          </div>
        </div>
      </div>

      <div className="recent-activities">
        <div className="section-header">
          <h2 className="section-title">Recent Activities</h2>
          <Link to="/activity" className="view-all">
            View All <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>

        <ul className="activity-list">
          <li className="activity-item">
            <div className="activity-icon">
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <div className="activity-content">
              <div className="activity-title">New Fee Created</div>
              <div className="activity-description">
                Annual Maintenance Fee was added to the system
              </div>
              <div className="activity-time">
                <FontAwesomeIcon icon={faClock} /> 2 hours ago
              </div>
            </div>
          </li>

          <li className="activity-item">
            <div className="activity-icon">
              <FontAwesomeIcon icon={faEdit} />
            </div>
            <div className="activity-content">
              <div className="activity-title">Fee Updated</div>
              <div className="activity-description">
                Processing Fee was modified by administrator
              </div>
              <div className="activity-time">
                <FontAwesomeIcon icon={faClock} /> Yesterday
              </div>
            </div>
          </li>

          <li className="activity-item">
            <div className="activity-icon">
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <div className="activity-content">
              <div className="activity-title">Fee Approved</div>
              <div className="activity-description">
                Membership Fee was approved and is now active
              </div>
              <div className="activity-time">
                <FontAwesomeIcon icon={faClock} /> 3 days ago
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className="section-header">
        <h2 className="section-title">Quick Actions</h2>
      </div>

      <div className="quick-actions">
        <Link to="/fees/create" className="action-card">
          <div className="action-icon">
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <div className="action-content">
            <div className="action-title">Create New Fee</div>
            <div className="action-description">
              Add a new fee type to the system
            </div>
          </div>
        </Link>

        <Link to="/fees" className="action-card">
          <div className="action-icon">
            <FontAwesomeIcon icon={faList} />
          </div>
          <div className="action-content">
            <div className="action-title">Manage Fees</div>
            <div className="action-description">
              View and edit existing fee details
            </div>
          </div>
        </Link>

        <Link to="/settings" className="action-card">
          <div className="action-icon">
            <FontAwesomeIcon icon={faCog} />
          </div>
          <div className="action-content">
            <div className="action-title">Settings</div>
            <div className="action-description">
              Configure system preferences
            </div>
          </div>
        </Link>

        <Link to="/reports" className="action-card">
          <div className="action-icon">
            <FontAwesomeIcon icon={faChartBar} />
          </div>
          <div className="action-content">
            <div className="action-title">Reports</div>
            <div className="action-description">
              Generate and view fee reports
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard; 