import React, { useState } from 'react';

const HotelApproval = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [pendingHotels, setPendingHotels] = useState([
    {
      id: 1,
      name: "Hotel Sunset View",
      location: "Mumbai, Maharashtra",
      ownerName: "Rajesh Kumar",
      ownerEmail: "rajesh@email.com",
      phone: "+91 98765 43210",
      gst: "27AABCU9603R1ZM",
      address: "123 Marine Drive, Mumbai - 400001",
      rooms: 25,
      pricePerHour: 500,
      amenities: ["WiFi", "AC", "Parking", "TV"],
      images: 4,
      submittedDate: "2025-10-20"
    },
    {
      id: 2,
      name: "Grand Stay Inn",
      location: "Pune, Maharashtra",
      ownerName: "Priya Sharma",
      ownerEmail: "priya@email.com",
      phone: "+91 98765 43211",
      gst: "27AABCU9603R1ZN",
      address: "456 FC Road, Pune - 411004",
      rooms: 18,
      pricePerHour: 400,
      amenities: ["WiFi", "AC", "Restaurant"],
      images: 3,
      submittedDate: "2025-10-22"
    }
  ]);

  const [approvedHotels, setApprovedHotels] = useState([
    { id: 3, name: "Hotel Sunshine", location: "Mumbai, Maharashtra", approvedDate: "2025-10-15", rooms: 30, status: "Active" }
  ]);

  const [rejectedHotels, setRejectedHotels] = useState([
    { id: 4, name: "Budget Stay", location: "Thane, Maharashtra", rejectedDate: "2025-10-18", reason: "Incomplete documentation" }
  ]);

  const handleApprove = (hotel) => {
    setPendingHotels(pendingHotels.filter(h => h.id !== hotel.id));
    setApprovedHotels([...approvedHotels, { ...hotel, approvedDate: new Date().toISOString().split('T')[0], status: 'Active' }]);
    setSelectedHotel(null);
    alert(`Hotel ${hotel.name} approved successfully!`);
  };

  const handleReject = (hotel) => {
    const reason = prompt('Enter rejection reason:');
    if (reason) {
      setPendingHotels(pendingHotels.filter(h => h.id !== hotel.id));
      setRejectedHotels([...rejectedHotels, { ...hotel, rejectedDate: new Date().toISOString().split('T')[0], reason }]);
      setSelectedHotel(null);
      alert(`Hotel ${hotel.name} rejected.`);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Hotel Approval System</h2>
        <p>Review and approve hotel registration requests</p>
      </div>

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
            <div key={hotel.id} className="hotel-card">
              <div className="hotel-card-header">
                <h3>{hotel.name}</h3>
                <span className="badge-pending">Pending</span>
              </div>
              <div className="hotel-info">
                <p><strong>Location:</strong> {hotel.location}</p>
                <p><strong>Owner:</strong> {hotel.ownerName}</p>
                <p><strong>GST:</strong> {hotel.gst}</p>
                <p><strong>Rooms:</strong> {hotel.rooms}</p>
                <p><strong>Price/Hour:</strong> ₹{hotel.pricePerHour}</p>
                <p><strong>Submitted:</strong> {hotel.submittedDate}</p>
              </div>
              <div className="hotel-actions">
                <button className="btn-view" onClick={() => setSelectedHotel(hotel)}>View Details</button>
                <button className="btn-approve" onClick={() => handleApprove(hotel)}>Approve</button>
                <button className="btn-reject" onClick={() => handleReject(hotel)}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'approved' && (
        <div className="hotels-list">
          {approvedHotels.map(hotel => (
            <div key={hotel.id} className="hotel-list-item">
              <div>
                <h3>{hotel.name}</h3>
                <p>{hotel.location}</p>
              </div>
              <div className="hotel-list-meta">
                <span className="badge-approved">{hotel.status}</span>
                <span className="date">Approved: {hotel.approvedDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'rejected' && (
        <div className="hotels-list">
          {rejectedHotels.map(hotel => (
            <div key={hotel.id} className="hotel-list-item">
              <div>
                <h3>{hotel.name}</h3>
                <p>{hotel.location}</p>
                <p className="rejection-reason">Reason: {hotel.reason}</p>
              </div>
              <div className="hotel-list-meta">
                <span className="badge-rejected">Rejected</span>
                <span className="date">Rejected: {hotel.rejectedDate}</span>
              </div>
            </div>
          ))}
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
                <p><strong>Location:</strong> {selectedHotel.location}</p>
                <p><strong>Address:</strong> {selectedHotel.address}</p>
                <p><strong>Total Rooms:</strong> {selectedHotel.rooms}</p>
                <p><strong>Price per Hour:</strong> ₹{selectedHotel.pricePerHour}</p>
              </div>
              <div className="detail-section">
                <h4>Owner Details</h4>
                <p><strong>Name:</strong> {selectedHotel.ownerName}</p>
                <p><strong>Email:</strong> {selectedHotel.ownerEmail}</p>
                <p><strong>Phone:</strong> {selectedHotel.phone}</p>
                <p><strong>GST Number:</strong> {selectedHotel.gst}</p>
              </div>
              <div className="detail-section">
                <h4>Amenities</h4>
                <div className="amenities-list">
                  {selectedHotel.amenities.map((amenity, i) => (
                    <span key={i} className="amenity-badge">{amenity}</span>
                  ))}
                </div>
              </div>
              <div className="detail-section">
                <h4>Room Images</h4>
                <p>{selectedHotel.images} images uploaded</p>
                <div className="image-grid">
                  {[...Array(selectedHotel.images)].map((_, i) => (
                    <div key={i} className="image-placeholder">Image {i + 1}</div>
                  ))}
                </div>
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
