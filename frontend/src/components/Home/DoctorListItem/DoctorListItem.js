import React from 'react';
import './DoctorListItem.scss';
import { Link } from '@reach/router';

const DoctorListItem = ({ name, id, state }) => {
  return (
    <Link to={`${id}`} state={state}>
      <div className="doctor-list-item-wrapper">
        <div className="doctor-list-item-container">
          <div className="profile">
            <div className="avatar" />
            <div>{name}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DoctorListItem;
