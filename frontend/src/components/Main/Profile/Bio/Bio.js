import React from 'react';
import Card from '../../../Card/Card';
import moment from 'moment';

const Bio = ({ user }) => {
  //helper function for calculating age from DOB
  const getAge = dateString => {
    const milliSecInYear = 1000 * 60 * 60 * 24 * 365.25;
    const today = new Date();
    const birthDate = new Date(dateString);
    //difference in milliseconds
    const diff = today - birthDate;
    const age = Math.floor(diff / milliSecInYear);
    return age;
  };

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
              <span>{user.lastName}</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Age</span>
              <span>{getAge(user.dateOfBirth)}</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Sex</span>
              <span>{user.sex === 'male' ? 'M' : 'F'}</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>DOB</span>
              <span>{moment(user.dateOfBirth).format('DD/MM/YYYY')}</span>
            </div>
          </div>
          {user.clientInfo ? (
            <>
              <div className="grid-item">
                <div className="user-info">
                  <span>Weight</span>
                  <span>{user.clientInfo.weight} kg</span>
                </div>
              </div>
              <div className="grid-item">
                <div className="user-info">
                  <span>Blood Type</span>
                  <span>{user.clientInfo.bloodType}</span>
                </div>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Bio;
