import React, { useState } from 'react';

const Analytics = () => {
  const [timeframe, setTimeframe] = useState('daily');

  const getMetrics = () => {
    const data = {
      daily: { bookings: 58, revenue: 29000, hotels: 24, users: 1320 },
      weekly: { bookings: 385, revenue: 192500, hotels: 24, users: 1320 },
      monthly: { bookings: 1650, revenue: 825000, hotels: 24, users: 1320 }
    };
    return data[timeframe];
  };

  const metrics = getMetrics();

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Analytics Dashboard</h2>
        <div className="timeframe-selector">
          <button className={timeframe === 'daily' ? 'active' : ''} onClick={() => setTimeframe('daily')}>Daily</button>
          <button className={timeframe === 'weekly' ? 'active' : ''} onClick={() => setTimeframe('weekly')}>Weekly</button>
          <button className={timeframe === 'monthly' ? 'active' : ''} onClick={() => setTimeframe('monthly')}>Monthly</button>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Total Bookings</h3>
          <p className="metric-value">{metrics.bookings}</p>
          <span className="metric-change positive">+12% from last {timeframe}</span>
        </div>
        <div className="analytics-card">
          <h3>Revenue</h3>
          <p className="metric-value">₹{metrics.revenue.toLocaleString()}</p>
          <span className="metric-change positive">+8% from last {timeframe}</span>
        </div>
        <div className="analytics-card">
          <h3>Active Hotels</h3>
          <p className="metric-value">{metrics.hotels}</p>
          <span className="metric-change neutral">No change</span>
        </div>
        <div className="analytics-card">
          <h3>Total Users</h3>
          <p className="metric-value">{metrics.users}</p>
          <span className="metric-change positive">+5% from last {timeframe}</span>
        </div>
      </div>

      <div className="chart-section">
        <h3>Booking Trends</h3>
        <div className="chart-placeholder">
          <p>Chart visualization would render here</p>
          <p>Showing {timeframe} booking trends</p>
        </div>
      </div>

      <div className="chart-section">
        <h3>Revenue by Location</h3>
        <div className="location-stats">
          <div className="location-item">
            <span>Mumbai</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '65%'}}></div>
            </div>
            <span>₹{(metrics.revenue * 0.65).toLocaleString()}</span>
          </div>
          <div className="location-item">
            <span>Pune</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '25%'}}></div>
            </div>
            <span>₹{(metrics.revenue * 0.25).toLocaleString()}</span>
          </div>
          <div className="location-item">
            <span>Thane</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '10%'}}></div>
            </div>
            <span>₹{(metrics.revenue * 0.10).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;