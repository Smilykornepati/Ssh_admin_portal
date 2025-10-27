import React, { useState } from 'react';

const Marketing = () => {
  const [activeTab, setActiveTab] = useState('coupons');
  const [showAddModal, setShowAddModal] = useState(false);

  const coupons = [
    { id: 1, code: 'WELCOME50', discount: '50%', type: 'Percentage', uses: 234, maxUses: 500, status: 'Active', expiry: '2025-12-31' },
    { id: 2, code: 'FIRST100', discount: '₹100', type: 'Fixed', uses: 156, maxUses: 200, status: 'Active', expiry: '2025-11-30' },
    { id: 3, code: 'SUMMER25', discount: '25%', type: 'Percentage', uses: 89, maxUses: 100, status: 'Active', expiry: '2025-10-31' }
  ];

  const referrals = [
    { id: 1, code: 'REF-AMIT123', user: 'Amit Patel', uses: 12, earned: 600, status: 'Active' },
    { id: 2, code: 'REF-SNEHA456', user: 'Sneha Reddy', uses: 8, earned: 400, status: 'Active' },
    { id: 3, code: 'REF-RAHUL789', user: 'Rahul Kumar', uses: 15, earned: 750, status: 'Active' }
  ];

  const campaigns = [
    { id: 1, name: 'Diwali Special', type: 'Email', sent: 1200, opened: 480, clicks: 120, status: 'Completed', date: '2025-10-20' },
    { id: 2, name: 'Weekend Discount', type: 'SMS', sent: 800, opened: 640, clicks: 160, status: 'Active', date: '2025-10-25' },
    { id: 3, name: 'New User Welcome', type: 'Push', sent: 450, opened: 315, clicks: 90, status: 'Active', date: '2025-10-26' }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Marketing Tools</h2>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>Create New</button>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'coupons' ? 'active' : ''}`} onClick={() => setActiveTab('coupons')}>
          Coupons
        </button>
        <button className={`tab ${activeTab === 'referrals' ? 'active' : ''}`} onClick={() => setActiveTab('referrals')}>
          Referral Codes
        </button>
        <button className={`tab ${activeTab === 'campaigns' ? 'active' : ''}`} onClick={() => setActiveTab('campaigns')}>
          Campaigns
        </button>
      </div>

      {activeTab === 'coupons' && (
        <div className="marketing-table">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Discount</th>
                <th>Type</th>
                <th>Uses</th>
                <th>Status</th>
                <th>Expiry</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.id}>
                  <td><strong>{coupon.code}</strong></td>
                  <td>{coupon.discount}</td>
                  <td>{coupon.type}</td>
                  <td>{coupon.uses} / {coupon.maxUses}</td>
                  <td><span className="status-badge active">{coupon.status}</span></td>
                  <td>{coupon.expiry}</td>
                  <td>
                    <button className="btn-edit-small">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'referrals' && (
        <div className="marketing-table">
          <table>
            <thead>
              <tr>
                <th>Referral Code</th>
                <th>User</th>
                <th>Uses</th>
                <th>Earned</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((ref) => (
                <tr key={ref.id}>
                  <td><strong>{ref.code}</strong></td>
                  <td>{ref.user}</td>
                  <td>{ref.uses}</td>
                  <td>₹{ref.earned}</td>
                  <td><span className="status-badge active">{ref.status}</span></td>
                  <td>
                    <button className="btn-view-small">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'campaigns' && (
        <div className="marketing-table">
          <table>
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Type</th>
                <th>Sent</th>
                <th>Opened</th>
                <th>Clicks</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td><strong>{campaign.name}</strong></td>
                  <td>{campaign.type}</td>
                  <td>{campaign.sent}</td>
                  <td>{campaign.opened} ({((campaign.opened/campaign.sent)*100).toFixed(0)}%)</td>
                  <td>{campaign.clicks}</td>
                  <td><span className={`status-badge ${campaign.status.toLowerCase()}`}>{campaign.status}</span></td>
                  <td>{campaign.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New {activeTab === 'coupons' ? 'Coupon' : activeTab === 'referrals' ? 'Referral Program' : 'Campaign'}</h3>
              <button onClick={() => setShowAddModal(false)} className="close-button">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name/Code</label>
                <input type="text" placeholder="Enter code" />
              </div>
              <div className="form-group">
                <label>Discount Value</label>
                <input type="text" placeholder="Enter value" />
              </div>
              <div className="form-group">
                <label>Expiry Date</label>
                <input type="date" />
              </div>
              <div className="modal-actions">
                <button className="cancel-button" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button className="submit-button" onClick={() => { alert('Created successfully!'); setShowAddModal(false); }}>Create</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketing;
