import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import ProfileMenu from './ProfileMenu';
import Overview from './Overview';
import HotelApproval from './HotelApproval';
import Analytics from './Analytics';
import Commission from './Commission';
import UserSupport from './UserSupport';
import Marketing from './Marketing';
import '../styles/Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState('overview');

  const renderPage = () => {
    switch(currentPage) {
      case 'overview':
        return <Overview />;
      case 'hotel-approval':
        return <HotelApproval />;
      case 'analytics':
        return <Analytics />;
      case 'commission':
        return <Commission />;
      case 'user-support':
        return <UserSupport />;
      case 'marketing':
        return <Marketing />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="dashboard-container">
      <Header 
        onProfileClick={() => setShowProfileMenu(!showProfileMenu)}
        showProfileMenu={showProfileMenu}
      />

      {showProfileMenu && (
        <ProfileMenu onLogout={onLogout} />
      )}

      <div className="dashboard-main">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="dashboard-content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;