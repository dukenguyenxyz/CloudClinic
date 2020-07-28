import React from 'react';
import './PatientListItem.scss';
import { Link } from '@reach/router';
const PatientListItem = ({ name, id }) => {
  return (
    <Link to={`${id}`}>
      <li className="patient-list-item-wrapper" key={name}>
        <div className="patient-list-item-container">
          <div className="profile">
            <div className="avatar"></div>
            <div>{name}</div>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default PatientListItem;
