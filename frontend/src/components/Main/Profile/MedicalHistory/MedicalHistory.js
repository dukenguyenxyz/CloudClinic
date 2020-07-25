import React from 'react';
import Card from '../../../Card/Card';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const MedicalHistory = ({ user }) => {
  return (
    <Card>
      <div className="user-profile-container">
        <div className="user-header-wrapper">
          <h2>Medical History</h2>
        </div>
        <div className="user-details-wrapper">
          <div className="grid-item">
            <div className="user-info">
              <span>Condition</span>
              {user.clientInfo.medicalHistory.map(el => (
                <span key={uuidv4()}>
                  {el.condition.charAt(0).toUpperCase() + el.condition.slice(1)}
                </span>
              ))}
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Start Date</span>
              {user.clientInfo.medicalHistory.map(el => (
                <span key={uuidv4()}>
                  {moment(el.startDate).format('DD/MM/YYYY')}
                </span>
              ))}
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Notes</span>
              {user.clientInfo.medicalHistory.map(el => (
                <span key={uuidv4()}>{el.notes}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MedicalHistory;
