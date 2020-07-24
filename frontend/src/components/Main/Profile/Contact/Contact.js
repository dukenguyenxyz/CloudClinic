import React from 'react';
import Card from '../../../Card/Card';

const Contact = () => {
  return (
    <Card>
      <div className="user-profile-container">
        <div className="user-header-wrapper">
          <h2>Contact</h2>
        </div>
        <div className="user-details-wrapper">
          <div className="grid-item">
            <div className="user-info">
              <span>Phone</span>
              <span>04104820594</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Email</span>
              <span>lorem@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Contact;
