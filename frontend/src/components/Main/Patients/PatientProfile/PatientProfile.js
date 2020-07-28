import React from 'react';
import '../../Profile/UserProfile/UserProfile.scss';
import Allergies from '../../Profile/Allergies/Allergies';
import Medications from '../../Profile/Medications/Medications';
import Contact from '../../Profile/Contact/Contact';
import Address from '../../Profile/Address/Address';
import MedicalHistory from '../../Profile/MedicalHistory/MedicalHistory';
import SessionHistory from '../../Profile/SessionHistory/SessionHistory';
import Bio from '../../Profile/Bio/Bio';

const PatientProfile = props => {
  //user object passed from reach router link
  const user = props.location.state;

  console.log(user);
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

export default PatientProfile;
