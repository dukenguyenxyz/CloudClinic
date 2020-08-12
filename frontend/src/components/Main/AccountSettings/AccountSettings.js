import React from 'react';
import './AccountSettings.scss';
import UpdateProfile from './UpdateProfile/UpdateProfile';

const AccountSettings = () => {
  return (
    <div className="account-settings-wrapper">
      <UpdateProfile />
    </div>
  );
};

export default AccountSettings;
