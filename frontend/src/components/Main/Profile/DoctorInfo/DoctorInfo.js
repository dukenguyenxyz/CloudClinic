import React from 'react';
import Card from '../../../Card/Card';
import { v4 as uuidv4 } from 'uuid';

const DoctorInfo = ({ user }) => {
  return (
    <Card>
      <div className="user-profile-container">
        <div className="user-header-wrapper">
          <h2>Information</h2>
        </div>
        <div className="user-details-wrapper doctor-info">
          <div className="grid-item">
            <div className="user-info">
              <span>licence</span>
              <span>{user.doctorInfo.licence}</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>accreditations</span>
              {user.doctorInfo.accreditations.map(el => (
                <span key={uuidv4()}>{el}</span>
              ))}
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>specialty</span>
              <span>{user.doctorInfo.specialtyField}</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>subspecialty</span>
              <span>{user.doctorInfo.subSpecialtyField}</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Education</span>
              {user.doctorInfo.education.map(el => (
                <span key={uuidv4()}>{el}</span>
              ))}
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Experience</span>
              <span>{user.doctorInfo.yearsExperience} Years</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Languages</span>
              {user.doctorInfo.languagesSpoken.map(el => (
                <span key={uuidv4()}>{el}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DoctorInfo;
