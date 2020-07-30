import React from 'react';
import './AccountSettings.scss';
import AxiosTest from '../../AxiosTest/AxiosTest';
import UpdateProfile from './UpdateProfile/UpdateProfile';

const AccountSettings = ({}) => {
  return (
    <div className="account-settings-wrapper">
      <UpdateProfile />
    </div>
  );
};

export default AccountSettings;
