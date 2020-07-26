import React from 'react';
import './AccountSettings.scss';
import AxiosTest from '../../AxiosTest/AxiosTest';
import UpdateProfile from './UpdateProfile/UpdateProfile';

const AccountSettings = ({}) => {
  return (
    <div className="account-settings-wrapper">
      {/* <h1>Update Form</h1>
      <h1>Delete Account</h1>
      <h1>Rest password</h1> */}
      {/* <AxiosTest /> */}
      <UpdateProfile />
    </div>
  );
};

export default AccountSettings;
