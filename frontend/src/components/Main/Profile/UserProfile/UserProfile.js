import React, { useState, useEffect, useContext } from 'react';
import './UserProfile.scss';
import Card from '../../../Card/Card';
import axios from 'axios';
import SessionHistory from '../SessionHistory/SessionHistory';
import MedicalHistory from '../MedicalHistory/MedicalHistory';
import Bio from '../Bio/Bio';
import Allergies from '../Allergies/Allergies';
import Medications from '../Medications/Medications';
import Address from '../Address/Address';
import DoctorInfo from '../DoctorInfo/DoctorInfo';
import Contact from '../Contact/Contact';
import { AuthContext } from '../../../../globalState/index';
import Upcoming from '../Upcoming/Upcoming';

const UserProfile = props => {
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // if user obj not in state, make axios call the get user info
    // set user with authcontext callback
    // creat a user {}
    // get the user string from local storage
    // parse the string
    // passing to the user object
  }, []);

  const doctorProfile = () => {
    return (
      <div className="user-profile-wrapper">
        <div className="panel-left">
          <Bio user={user} />
          <div className="sub-cards">
            <DoctorInfo user={user} />
            <Address user={user} />
            <Contact user={user} />
          </div>
        </div>
        <Upcoming user={user} />
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
            <Contact user={user} />
            <Address user={user} />
          </div>
        </div>
        <div>
          <MedicalHistory user={user} />
          <SessionHistory user={user} />
        </div>
      </div>
    );
  };

  const showProfile = () => {
    return user.isDoctor ? doctorProfile() : clientProfile();
  };

  return <React.Fragment>{showProfile()}</React.Fragment>;
};

export default UserProfile;
