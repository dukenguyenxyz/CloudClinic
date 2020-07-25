import React, { useState, useEffect, useContext } from 'react';
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
import { AuthContext } from '../../../../globalState/index';

const UserProfile = props => {
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // if user obj not in state, make axios call the get user info
    // set user with authcontext callback
  }, []);

  const doctorProfile = () => {
    return (
      <div className="user-profile-wrapper">
        <div className="panel-left">
          <Bio user={user} />
          <div className="sub-cards">
            <DoctorInfo />
            <Address />
            <Contact />
          </div>
        </div>
        <h1>Something here</h1>
      </div>
    );
  };

  const clientProfile = () => {
    return (
      <div className="user-profile-wrapper">
        <div className="panel-left">
          <Bio user={user} />
          <div className="sub-cards">
            <Allergies user={user} />
            <Medications user={user} />
            <Contact />
            <Address />
          </div>
        </div>
        <MedicalHistory />
      </div>
    );
  };

  const showProfile = () => {
    return user.isDoctor ? doctorProfile() : clientProfile();
  };

  return <React.Fragment>{showProfile()}</React.Fragment>;
};

export default UserProfile;
