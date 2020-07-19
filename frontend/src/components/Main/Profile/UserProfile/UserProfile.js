import React, { useState, useEffect } from 'react';
import './UserProfile.scss';
import Card from '../../../Card/Card';

const UserProfile = props => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // we get access to user id through props here
    // query db and pull user info into state to display
  }, []);

  return (
    <div className="user-profile-wrapper">
      <Card>
        <div className="user-profile-container">
          <div className="user-header-wrapper">
            <div className="avatar" />
            <div className="name">
              Michael
              <br />
              Gordon
            </div>
          </div>
          <div className="user-details-wrapper">
            <div className="row">
              <div className="user-info">
                <span>First Name</span>
                <span>Michael</span>
              </div>
              <div className="user-info">
                <span>Last Name</span>
                <span> Gordon</span>
              </div>
              <div className="user-info">
                <span>Age</span>
                <span>26</span>
              </div>
            </div>
            <div className="row">
              <div className="user-info">
                <span>Weight</span>
                <span>82kg</span>
              </div>
              <div className="user-info">
                <span>Height</span>
                <span>182cm</span>
              </div>
              <div className="user-info">
                <span>Sex</span>
                <span>M</span>
              </div>
            </div>
            <div className="row">
              <div className="user-info">
                <span>DOB</span>
                <span>9/1/1994</span>
              </div>
              <div className="user-info">
                <span>Blood Type</span>
                <span>A-</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <h1>main</h1>
      </Card>
    </div>
  );
};

export default UserProfile;
