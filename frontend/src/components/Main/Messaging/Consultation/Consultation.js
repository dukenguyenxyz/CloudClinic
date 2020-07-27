import React from 'react';
import Card from '../../../Card/Card';
import './Consultation.scss';
import Button from '../../../Button/Button';
const Consultation = () => {
  return (
    <Card>
      <div className="consultation-wrapper">
        <h1>Consultation</h1>
        <div className="user-details-wrapper">
          <div className="grid-item">
            <div className="user-info">
              <span>Patient</span>
              <span>Michael Gordon</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Description</span>
              <span>Joint Pain</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Start</span>
              <span>8:00 AM</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Finish</span>
              <span>9:00 AM</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Invoice</span>
              <span>$93.75</span>
            </div>
          </div>
          <div className="grid-item">
            <Button
              action="Invoice"
              icon="check"
              color="pink"
              onClick={() => console.log('stripe process')}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Consultation;
