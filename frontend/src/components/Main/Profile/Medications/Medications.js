import React from 'react';
import Card from '../../../Card/Card';
import { v4 as uuidv4 } from 'uuid';

const Medications = () => {
  const medications = [
    {
      name: 'Magic mushroom',
      dosage: '200',
      manufacturer: 'Brazil',
    },
    {
      name: 'Cannabis',
      dosage: '100',
      manufacturer: 'Australia',
    },
  ];
  return (
    <Card>
      <div className="user-profile-container">
        <div className="user-header-wrapper">
          <h2>Medication</h2>
        </div>
        <div className="user-details-wrapper">
          <div className="grid-item">
            <div className="user-info">
              <span>Type</span>
              {medications.map(el => (
                <span key={uuidv4()}>{el.name}</span>
              ))}
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Brand</span>
              {medications.map(el => (
                <span key={uuidv4()}>{el.manufacturer}</span>
              ))}
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Ml</span>
              {medications.map(el => (
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
