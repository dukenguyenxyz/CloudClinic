import React from 'react';
import Card from '../../../Card/Card';
import { v4 as uuidv4 } from 'uuid';

const Allergies = ({ user }) => {
  const severityEnum = Object.freeze({
    '1': 'Minor',
    '2': 'Moderate',
    '3': 'Serious',
    '4': 'Severe',
    '5': 'Critical',
  });

  return (
    <Card>
      <div className="user-profile-container">
        <div className="user-header-wrapper">
          <h2>Allergies</h2>
        </div>

        <div className="user-details-wrapper">
          <div className="grid-item">
            <div className="user-info">
              <span>Type</span>
              {user.clientInfo.allergies.map(el => (
                <span key={uuidv4()}>
                  {el.name.charAt(0).toUpperCase() + el.name.slice(1)}
                </span>
              ))}
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Severity</span>
              {user.clientInfo.allergies.map(el => (
                <span key={uuidv4()}>{severityEnum[el.severity]}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Allergies;
