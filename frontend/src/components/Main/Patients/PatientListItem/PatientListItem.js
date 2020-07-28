import React from 'react';
import './PatientListItem.scss';
import { Link } from '@reach/router';
const PatientListItem = ({ name, id, state }) => {
  return (
    <Link to={`${id}`} state={state}>
      <div className="patient-list-item-wrapper">
        <div className="patient-list-item-container">
          <div className="profile">
            <div className="avatar" />
            <div>{name}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PatientListItem;
