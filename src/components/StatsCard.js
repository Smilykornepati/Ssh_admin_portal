import React from 'react';

const StatsCard = ({ icon, value, label, bgColor }) => {
  return (
    <div className="stats-card">
      <div className="stats-icon" style={{ backgroundColor: bgColor }}>
        {icon}
      </div>
      <h3 className="stats-value">{value}</h3>
      <p className="stats-label">{label}</p>
    </div>
  );
};

export default StatsCard;