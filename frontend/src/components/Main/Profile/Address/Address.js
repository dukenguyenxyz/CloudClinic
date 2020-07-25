import React from 'react';
import Card from '../../../Card/Card';
const Address = ({ user }) => {
  const getStreet = () => {
    return `${user.address.number} ${user.address.street}`;
  };
  const getCityAndState = () => {
    return `${user.address.city}, ${user.address.state}`;
  };
  const getCountryAndPostcode = () => {
    return `${user.address.country}, ${user.address.postcode}`;
  };

  return (
    <Card>
      <div className="user-profile-container">
        <div className="user-header-wrapper">
          <h2>Address</h2>
        </div>
        <div className="user-details-wrapper">
          <div className="user-info">
            <span>Full Address</span>
            <span>{getStreet()}</span>
            <span>{getCityAndState()}</span>
            <span>{getCountryAndPostcode()}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Address;
