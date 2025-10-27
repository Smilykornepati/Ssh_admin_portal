import React, { useState } from 'react';

const UserSupport = () => {
  const [activeTab, setActiveTab] = useState('complaints');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const complaints = [
    { id: 1, user: 'Amit Patel', email: 'amit@email.com', hotel: 'Hotel Sunshine', issue: 'Room was not clean', status: 'Open', date: '2025-10-26', priority: 'High' },
    { id: 2, user: 'Sneha Reddy', email: 'sneha@email.com', hotel: 'Grand Stay Inn', issue: 'AC not working', status: 'In Progress', date: '2025-10-25', priority: 'Medium' },
    { id: 3, user: 'Rahul Kumar', email: 'rahul@email.com', hotel: 'Hotel Paradise', issue: 'Late check-in', status: 'Open', date: '2025-10-27', priority: 'Low' }
  ];

  const refunds = [
    { id: 1, user: 'Priya Sharma', amount: 1500, reason: 'Booking cancelled', status: 'Pending', date: '2025-10-26' },
    { id: 2, user: 'Vijay Singh', amount: 2000, reason: 'Service issue', status: 'Approved', date: '2025-10-24' }
  ];

  const handleResolve = (ticket) => {
    alert(`Ticket ${ticket.id} marked as resolved`);
    setSelectedTicket(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>User Support</h2>
        <p>Manage customer complaints, refunds, and support tickets</p>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'complaints' ? 'active' : ''}`} onClick={() => setActiveTab('complaints')}>
          Complaints ({complaints.length})
        </button>
        <button className={`tab ${activeTab === 'refunds' ? 'active' : ''}`} onClick={() => setActiveTab('refunds')}>
          Refunds ({refunds.length})
        </button>
      </div>

      {activeTab === 'complaints' && (
        <div className="support-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Hotel</th>
                <th>Issue</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((ticket) => (
                <tr key={ticket.id}>
                  <td>#{ticket.id}</td>
                  <td>
                    <div>{ticket.user}</div>
                    <div className="email-small">{ticket.email}</div>
                  </td>
                  <td>{ticket.hotel}</td>
                  <td>{ticket.issue}</td>
                  <td><span className={`priority-badge ${ticket.priority.toLowerCase()}`}>{ticket.priority}</span></td>
                  <td><span className={`status-badge ${ticket.status.toLowerCase().replace(' ', '-')}`}>{ticket.status}</span></td>
                  <td>{ticket.date}</td>
                  <td>
                    <button className="btn-view-small" onClick={() => setSelectedTicket(ticket)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'refunds' && (
        <div className="support-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Amount</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {refunds.map((refund) => (
                <tr key={refund.id}>
                  <td>#{refund.id}</td>
                  <td>{refund.user}</td>
                  <td>₹{refund.amount}</td>
                  <td>{refund.reason}</td>
                  <td><span className={`status-badge ${refund.status.toLowerCase()}`}>{refund.status}</span></td>
                  <td>{refund.date}</td>
                  <td>
                    {refund.status === 'Pending' && (
                      <button className="btn-approve-small">Approve</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedTicket && (
        <div className="modal-overlay" onClick={() => setSelectedTicket(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Ticket #{selectedTicket.id}</h3>
              <button onClick={() => setSelectedTicket(null)} className="close-button">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <h4>User Information</h4>
                <p><strong>Name:</strong> {selectedTicket.user}</p>
                <p><strong>Email:</strong> {selectedTicket.email}</p>
              </div>
              <div className="detail-section">
                <h4>Complaint Details</h4>
                <p><strong>Hotel:</strong> {selectedTicket.hotel}</p>
                <p><strong>Issue:</strong> {selectedTicket.issue}</p>
                <p><strong>Priority:</strong> {selectedTicket.priority}</p>
                <p><strong>Date:</strong> {selectedTicket.date}</p>
              </div>
              <div className="modal-actions">
                <button className="btn-approve" onClick={() => handleResolve(selectedTicket)}>Mark as Resolved</button>
                <button className="cancel-button" onClick={() => setSelectedTicket(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSupport;
