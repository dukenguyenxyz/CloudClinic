import React from 'react';
import Card from '../../../Card/Card';
const Address = () => {
  return (
    <Card>
      <div className="user-profile-container">
        <div className="user-header-wrapper">
          <h2>Address</h2>
        </div>
        <div className="user-details-wrapper">
          <div className="grid-item">
            <div className="user-info">
              <span>Number</span>
              <span>4</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Street</span>
              <span>Beamish Street</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>City</span>
              <span>Sydney</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>State</span>
              <span>NSW</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Country</span>
              <span>Australia</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Postcode</span>
              <span>2149</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Address;
