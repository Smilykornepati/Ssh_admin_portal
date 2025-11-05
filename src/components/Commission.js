import React, { useState } from 'react';

const Commission = () => {
  const [viewType, setViewType] = useState('hotel');

  const hotelCommissions = [
    { hotel: 'Hotel Sunshine', location: 'Mumbai', bookings: 45, revenue: 22500, commission: 2925, rate: 13 },
    { hotel: 'Grand Stay Inn', location: 'Pune', bookings: 32, revenue: 16000, commission: 1920, rate: 12 },
    { hotel: 'Hotel Paradise', location: 'Mumbai', bookings: 28, revenue: 14000, commission: 1680, rate: 12 },
    { hotel: 'Budget Comfort', location: 'Thane', bookings: 21, revenue: 10500, commission: 1050, rate: 10 }
  ];

  const locationCommissions = [
    { location: 'Mumbai', hotels: 12, bookings: 245, revenue: 122500, commission: 15925 },
    { location: 'Pune', hotels: 8, bookings: 95, revenue: 47500, commission: 5700 },
    { location: 'Thane', hotels: 4, bookings: 45, revenue: 22500, commission: 2250 }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Commission Management</h2>
        <p>Track commission earnings from hotels and locations</p>
      </div>

      <div className="commission-summary">
        <div className="summary-card">
          <h3>Total Commission</h3>
          <p className="summary-value">₹23,875</p>
          <span className="summary-period">This Month</span>
        </div>
        <div className="summary-card">
          <h3>Average Rate</h3>
          <p className="summary-value">12.1%</p>
          <span className="summary-period">Across all hotels</span>
        </div>
        <div className="summary-card">
          <h3>Total Bookings</h3>
          <p className="summary-value">385</p>
          <span className="summary-period">This Month</span>
        </div>
      </div>

      <div className="view-toggle">
        <button className={viewType === 'hotel' ? 'active' : ''} onClick={() => setViewType('hotel')}>By Hotel</button>
        <button className={viewType === 'location' ? 'active' : ''} onClick={() => setViewType('location')}>By Location</button>
      </div>

      {viewType === 'hotel' && (
        <div className="commission-table">
          <table>
            <thead>
              <tr>
                <th>Hotel Name</th>
                <th>Location</th>
                <th>Bookings</th>
                <th>Revenue</th>
                <th>Rate</th>
                <th>Commission</th>
              </tr>
            </thead>
            <tbody>
              {hotelCommissions.map((item, i) => (
                <tr key={i}>
                  <td>{item.hotel}</td>
                  <td>{item.location}</td>
                  <td>{item.bookings}</td>
                  <td>₹{item.revenue.toLocaleString()}</td>
                  <td>{item.rate}%</td>
                  <td className="commission-amount">₹{item.commission.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewType === 'location' && (
        <div className="commission-table">
          <table>
            <thead>
              <tr>
                <th>Location</th>
                <th>Hotels</th>
                <th>Bookings</th>
                <th>Revenue</th>
                <th>Commission</th>
              </tr>
            </thead>
            <tbody>
              {locationCommissions.map((item, i) => (
                <tr key={i}>
                  <td>{item.location}</td>
                  <td>{item.hotels}</td>
                  <td>{item.bookings}</td>
                  <td>₹{item.revenue.toLocaleString()}</td>
                  <td className="commission-amount">₹{item.commission.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Commission;
