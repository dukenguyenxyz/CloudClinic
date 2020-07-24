import React from 'react';
import Card from '../../../Card/Card';
const Address = () => {
  const address = {
    number: '4',
    street: 'Beamish Street',
    city: 'Sydney',
    state: 'New South Wales',
    country: 'Australia',
    postcode: '2149',
  };

  const getStreet = () => {
    return `${address.number} ${address.street}`;
  };
  const getCityAndState = () => {
    return `${address.city}, ${address.state}`;
  };
  const getCountryAndPostcode = () => {
    return `${address.country}, ${address.postcode}`;
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
