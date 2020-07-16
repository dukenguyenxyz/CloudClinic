import React from 'react';
import './Profile.scss';
import { LogOut } from 'react-feather';

const Profile = () => {
  return (
    <div className="navbar-profile-wrapper">
      <div className="profile">
        <div className="avatar" />
        <span className="name">Dr. Sarah Jones</span>
      </div>
      <div className="logout">
        <LogOut />
      </div>
    </div>
  );
};

export default Profile;
