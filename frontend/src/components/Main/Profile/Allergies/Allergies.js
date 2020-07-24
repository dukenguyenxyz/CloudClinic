import React from 'react';
import Card from '../../../Card/Card';
import { v4 as uuidv4 } from 'uuid';

const Allergies = () => {
  const allergies = [
    {
      name: 'Dust allergy',
      severity: '3',
    },
    {
      name: 'Pollen allergy',
      severity: '2',
    },
  ];

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
              {allergies.map(el => (
                <span key={uuidv4()}>{el.name}</span>
              ))}
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Severity</span>
              {allergies.map(el => (
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
