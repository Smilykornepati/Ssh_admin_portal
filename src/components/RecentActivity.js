import React from 'react';

const RecentActivity = () => {
  const activities = [
    { action: 'New booking at Hotel Sunshine', time: '5 minutes ago', type: 'booking' },
    { action: 'Staff member added: John Doe', time: '1 hour ago', type: 'staff' },
    { action: 'Payment received: ₹2,500', time: '2 hours ago', type: 'payment' },
    { action: 'Room cleaned at Hotel Paradise', time: '3 hours ago', type: 'maintenance' },
  ];

  const getStatusColor = (type) => {
    switch(type) {
      case 'booking': return '#10b981';
      case 'staff': return '#3b82f6';
      case 'payment': return '#8b5cf6';
      case 'maintenance': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div className="recent-activity">
      <h3>Recent Activity</h3>
      <div className="activity-list">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div className="activity-content">
              <div 
                className="activity-dot" 
                style={{ backgroundColor: getStatusColor(activity.type) }}
              ></div>
              <span className="activity-text">{activity.action}</span>
            </div>
            <span className="activity-time">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;