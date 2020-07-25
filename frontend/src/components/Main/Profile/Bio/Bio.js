import React from 'react';
import Card from '../../../Card/Card';

const Bio = ({ user }) => {
  console.log(user);
  return (
    <Card>
      <div className="user-profile-container">
        <div className="user-header-wrapper">
          <div className="avatar" />
          <div className="name">
            {user.isDoctor && 'Dr.'} {user.firstName}
            <br />
            {user.lastName}
          </div>
        </div>
        <div className="user-details-wrapper">
          <div className="grid-item">
            <div className="user-info">
              <span>First Name</span>
              <span>{user.firstName}</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Last Name</span>
              <span>Gordon</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Age</span>
              <span>26</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Weight</span>
              <span>82 kgs</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Sex</span>
              <span>M</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>DOB</span>
              <span>9/1/1994</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Blood Type</span>
              <span>A-</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Bio;
