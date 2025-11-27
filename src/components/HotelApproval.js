// [file name]: HotelApproval.js

import React, { useState, useEffect } from 'react';

const HotelApproval = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [pendingHotels, setPendingHotels] = useState([]);
  const [approvedHotels, setApprovedHotels] = useState([]);
  const [rejectedHotels, setRejectedHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch hotels based on status
  const fetchHotels = async (status) => {
    try {
      const response = await fetch(`http://localhost:8000/api/hotels/registrations?status=${status}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      throw new Error(result.message || 'Failed to fetch data');
    } catch (error) {
      console.error(`Error fetching ${status} hotels:`, error);
      setError(`Failed to load ${status} hotels: ${error.message}`);
      return [];
    }
  };

  // Load all hotels
  const loadAllHotels = async () => {
    setLoading(true);
    setError('');
    try {
      const [pending, approved, rejected] = await Promise.all([
        fetchHotels('pending'),
        fetchHotels('approved'),
        fetchHotels('rejected')
      ]);

      setPendingHotels(pending);
      setApprovedHotels(approved);
      setRejectedHotels(rejected);
    } catch (error) {
      console.error('Error loading hotels:', error);
      setError('Failed to load hotels: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllHotels();
  }, []);

  const handleApprove = async (hotel) => {
    try {
      const response = await fetch(`http://localhost:8000/api/hotels/registrations/${hotel._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' })
      });

      const result = await response.json();

      if (result.success) {
        await loadAllHotels();
        setSelectedHotel(null);
        alert(`Hotel ${hotel.name} approved successfully!`);
      } else {
        alert('Error approving hotel: ' + result.message);
      }
    } catch (error) {
      console.error('Approval error:', error);
      alert('Error approving hotel. Please try again.');
    }
  };

  const handleReject = async (hotel) => {
    const reason = prompt('Enter rejection reason:');
    if (reason) {
      try {
        const response = await fetch(`http://localhost:8000/api/hotels/registrations/${hotel._id}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'rejected', reason })
        });

        const result = await response.json();

        if (result.success) {
          await loadAllHotels();
          setSelectedHotel(null);
          alert(`Hotel ${hotel.name} rejected.`);
        } else {
          alert('Error rejecting hotel: ' + result.message);
        }
      } catch (error) {
        console.error('Rejection error:', error);
        alert('Error rejecting hotel. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="text-center py-8">Loading hotel registrations...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Hotel Approval System</h2>
        <p>Review and approve hotel registration requests</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-xl text-red-200">
          ❌ {error}
          <button 
            onClick={loadAllHotels}
            className="ml-4 px-3 py-1 bg-red-500 rounded text-white text-sm"
          >
            Retry
          </button>
        </div>
      )}

      <div className="tabs">
        <button className={`tab ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => setActiveTab('pending')}>
          Pending ({pendingHotels.length})
        </button>
        <button className={`tab ${activeTab === 'approved' ? 'active' : ''}`} onClick={() => setActiveTab('approved')}>
          Approved ({approvedHotels.length})
        </button>
        <button className={`tab ${activeTab === 'rejected' ? 'active' : ''}`} onClick={() => setActiveTab('rejected')}>
          Rejected ({rejectedHotels.length})
        </button>
      </div>

      {activeTab === 'pending' && (
        <div className="hotels-grid">
          {pendingHotels.map(hotel => (
            <div key={hotel._id} className="hotel-card">
              <div className="hotel-card-header">
                <h3>{hotel.name}</h3>
                <span className="badge-pending">Pending</span>
              </div>
              <div className="hotel-info">
                <p><strong>Phone:</strong> {hotel.phone}</p>
                <p><strong>GST:</strong> {hotel.gst}</p>
                <p><strong>Aadhar:</strong> {hotel.aadhar}</p>
                <p><strong>Submitted:</strong> {new Date(hotel.submittedAt).toLocaleDateString()}</p>
              </div>
              <div className="hotel-actions">
                <button className="btn-view" onClick={() => setSelectedHotel(hotel)}>View Details</button>
                <button className="btn-approve" onClick={() => handleApprove(hotel)}>Approve</button>
                <button className="btn-reject" onClick={() => handleReject(hotel)}>Reject</button>
              </div>
            </div>
          ))}
          {pendingHotels.length === 0 && (
            <div className="text-center py-8 text-gray-500">No pending registrations</div>
          )}
        </div>
      )}

      {activeTab === 'approved' && (
        <div className="hotels-list">
          {approvedHotels.map(hotel => (
            <div key={hotel._id} className="hotel-list-item">
              <div>
                <h3>{hotel.name}</h3>
                <p>{hotel.businessAddress}</p>
                <p className="text-sm text-gray-400">Phone: {hotel.phone}</p>
              </div>
              <div className="hotel-list-meta">
                <span className="badge-approved">Approved</span>
                <span className="date">Submitted: {new Date(hotel.submittedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
          {approvedHotels.length === 0 && (
            <div className="text-center py-8 text-gray-500">No approved registrations</div>
          )}
        </div>
      )}

      {activeTab === 'rejected' && (
        <div className="hotels-list">
          {rejectedHotels.map(hotel => (
            <div key={hotel._id} className="hotel-list-item">
              <div>
                <h3>{hotel.name}</h3>
                <p>{hotel.businessAddress}</p>
                {hotel.rejectionReason && (
                  <p className="rejection-reason">Reason: {hotel.rejectionReason}</p>
                )}
              </div>
              <div className="hotel-list-meta">
                <span className="badge-rejected">Rejected</span>
                <span className="date">Submitted: {new Date(hotel.submittedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
          {rejectedHotels.length === 0 && (
            <div className="text-center py-8 text-gray-500">No rejected registrations</div>
          )}
        </div>
      )}

      {selectedHotel && (
        <div className="modal-overlay" onClick={() => setSelectedHotel(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedHotel.name}</h3>
              <button onClick={() => setSelectedHotel(null)} className="close-button">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <h4>Hotel Information</h4>
                <p><strong>Name:</strong> {selectedHotel.name}</p>
                <p><strong>Phone:</strong> {selectedHotel.phone}</p>
                <p><strong>Address:</strong> {selectedHotel.address}</p>
                <p><strong>Business Address:</strong> {selectedHotel.businessAddress}</p>
              </div>
              <div className="detail-section">
                <h4>Document Details</h4>
                <p><strong>GST Number:</strong> {selectedHotel.gst}</p>
                <p><strong>Aadhar Number:</strong> {selectedHotel.aadhar}</p>
              </div>
              <div className="detail-section">
                <h4>Submission Details</h4>
                <p><strong>Submitted:</strong> {new Date(selectedHotel.submittedAt).toLocaleString()}</p>
                <p><strong>Status:</strong> <span className={`badge-${selectedHotel.status}`}>{selectedHotel.status}</span></p>
              </div>
              <div className="modal-actions">
                <button className="btn-approve" onClick={() => handleApprove(selectedHotel)}>Approve Hotel</button>
                <button className="btn-reject" onClick={() => handleReject(selectedHotel)}>Reject Hotel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelApproval;
