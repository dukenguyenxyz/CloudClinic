import React, { useState, useEffect } from 'react';
import './UserProfile.scss';
import Card from '../../../Card/Card';
import axios from 'axios';
import MedicalHistory from '../MedicalHistory/MedicalHistory';
import Bio from '../Bio/Bio';
import Allergies from '../Allergies/Allergies';
import Medications from '../Medications/Medications';
import Address from '../Address/Address';
import DoctorInfo from '../DoctorInfo/DoctorInfo';
import Contact from '../Contact/Contact';

const UserProfile = props => {
  const [user, setUser] = useState({});
  return (
    <div className="user-profile-wrapper">
      <div className="panel-left">
        <Bio />
        <div className="sub-cards">
          <Contact />
          <DoctorInfo />
          <Address />
          <Allergies />
          <Medications />
        </div>
      </div>
      <MedicalHistory />
    </div>
  );
};

export default UserProfile;
