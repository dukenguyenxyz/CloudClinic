import React from 'react';
import './DoctorListItem.scss';
import { Link } from '@reach/router';

const DoctorListItem = ({ doctor }) => {
  return (
    <Link to={`/${doctor.id}`} state={doctor}>
      <div className="doctor-list-item-wrapper">
        <div className="doctor-list-item-container">
          <div className="profile">
            <img
              className="avatar"
              src={doctor.profileImage ? doctor.profileImage : null}
            />
            <div>
              {doctor.firstName} {doctor.lastName}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DoctorListItem;
