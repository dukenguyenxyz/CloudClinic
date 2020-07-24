import React from 'react';
import Card from '../../../Card/Card';
import { v4 as uuidv4 } from 'uuid';

const DoctorInfo = () => {
  // doctorInfo: {
  //     licence: 'MIT',
  //     accreditations: ['USyd', 'UNSW'],
  //     specialtyField: 'Dentistry',
  //     subSpecialtyField: 'Prosthodontics',
  //     education: ['ANU', 'Macquarie University'],
  //     yearsExperience: '10',
  //     tags: ['Orthodontics', 'Prosthodontics'],
  //     languagesSpoken: ['Cantonese', 'Mandarin', 'Japanese', 'English'],
  //   },

  const accreditations = ['Doctor of Medicine', 'Doctor of Dental Medicine'];
  const languagesSpoken = ['Cantonese', 'Mandarin', 'Japanese', 'English'];
  const education = ['ANU', 'Macquarie University'];
  const tags = ['Orthodontics', 'Prosthodontics'];
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
              <span>ADHFDSJH32</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>accreditations</span>
              {accreditations.map(el => (
                <span key={uuidv4()}>{el}</span>
              ))}
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>specialty</span>
              <span>Dentistry</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>subspecialty</span>
              <span>Prosthodontics</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Education</span>
              {education.map(el => (
                <span key={uuidv4()}>{el}</span>
              ))}
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Experience</span>
              <span>10 Years</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Languages</span>
              {languagesSpoken.map(el => (
                <span key={uuidv4()}>{el}</span>
              ))}
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Tags</span>
              {tags.map(el => (
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
