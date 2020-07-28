import React from 'react';
import Card from '../../../Card/Card';

const Contact = ({ user }) => {
  return (
    <Card>
      <div className="user-profile-container">
        <div className="user-header-wrapper">
          <h2>Contact</h2>
        </div>
        <div className="user-details-wrapper user-contact">
          <div className="grid-item">
            <div className="user-info">
              <span>Phone</span>
              <span>{user.phoneNumber}</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Email</span>
              <span>{user.email}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Contact;
