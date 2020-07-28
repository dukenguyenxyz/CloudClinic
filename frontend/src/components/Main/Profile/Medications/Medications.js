import React from 'react';
import Card from '../../../Card/Card';
import { v4 as uuidv4 } from 'uuid';

const Medications = ({ user }) => {
  return (
    <Card>
      <div className="user-profile-container">
        <div className="user-header-wrapper">
          <h2>Medication</h2>
        </div>
        <div className="user-details-wrapper user-contact">
          <div className="grid-item">
            <div className="user-info">
              <span>Type</span>
              {user.clientInfo.medication.map(el => (
                <span key={uuidv4()}>
                  {el.name.charAt(0).toUpperCase() + el.name.slice(1)}
                </span>
              ))}
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Brand</span>
              {user.clientInfo.medication.map(el => (
                <span key={uuidv4()}>{el.manufacturer}</span>
              ))}
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Ml</span>
              {user.clientInfo.medication.map(el => (
                <span key={uuidv4()}>{el.dosage}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Medications;
