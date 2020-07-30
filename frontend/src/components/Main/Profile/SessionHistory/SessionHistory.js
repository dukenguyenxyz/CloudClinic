import React from 'react';
import './SessionHistory.scss';
import Card from '../../../Card/Card';

const SessionHistory = ({ user }) => {
  return (
    <Card>
      <div className="user-profile-container">
        <div className="user-header-wrapper">
          <h2>Session History</h2>
        </div>
        <div className="user-medical-history-wrapper">
          <div className="visit">
            <div className="visit-panel">
              <div className="visit-details">
                <span>15/7/2020</span>
                <span>Dr. Sarah Jones</span>
              </div>
              <div className="tags-wrapper">
                <span className="tag">nauseous</span>
                <span className="tag">sore throat</span>
                <span className="tag">back pain</span>
                <span className="tag">muscle ache</span>
                <span className="tag">vomiting</span>
                <span className="tag">infection</span>
                <span className="tag">fatigue</span>
              </div>
            </div>
            <div className="visit-notes">
              <p>
                A previously healthy 56-year-old gentleman who presents with a
                four day history of shortness of breath, hemoptysis, and
                right-sided chest pain. He works as a truck driver, and the
                symptoms began four days prior to admission, where worsening of
                his dyspnea and pain prompted him to go to the emergency room.
                There, he was diagnosed with pneumonia and placed on Levaquin
                500 mg daily and Benzonatate 200 mg TID, which he has been
                taking for two days with only slight improvement. He continues
                to experience shortness of breath, right sided chest pain, and
                hemoptysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SessionHistory;
