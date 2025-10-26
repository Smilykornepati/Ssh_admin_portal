import React, { useState } from 'react';
import '../styles/LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email === 'admin.ssh@ssh.com' && password === 'AdminQWERTY@2003') {
      onLogin();
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">SSH</div>
            <div className="logo-text">
              <h1>Short Stay Hotel</h1>
              <p>Admin Portal</p>
            </div>
          </div>
        </div>
      </header>

      <div className="login-content">
        <div className="info-section">
          <div className="badge">Pay By Hour • Save Money</div>
          
          <h2 className="main-heading">
            Manage Your Hotel Network with Ease
          </h2>
          
          <p className="description">
            SSH Admin Portal empowers you to manage clean and hygienic hotels & PGs 
            across your network. Control bookings, staff, and operations all in one place.
          </p>

          <div className="features-list">
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div className="feature-text">
                <h3>Real-time Dashboard</h3>
                <p>Monitor bookings and revenue in real-time</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div className="feature-text">
                <h3>Staff Management</h3>
                <p>Add and manage staff across all locations</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div className="feature-text">
                <h3>Analytics & Reports</h3>
                <p>Track performance with detailed insights</p>
              </div>
            </div>
          </div>
        </div>

        <div className="login-form-section">
          <div className="login-box">
            <div className="login-box-header">
              <h3>Admin Login</h3>
              <p>Enter your credentials to access the portal</p>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin.ssh@ssh.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="error-message">{error}</div>
            )}

            <button onClick={handleLogin} className="login-button">
              Sign In
            </button>

            <div className="demo-credentials">
              <p>For demo: admin.ssh@ssh.com / AdminQWERTY@2003</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="login-footer">
        <p>&copy; 2025 Short Stay Hotel. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;