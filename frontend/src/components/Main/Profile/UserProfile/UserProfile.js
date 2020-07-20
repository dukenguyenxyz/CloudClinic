import React, { useState, useEffect } from 'react';
import './UserProfile.scss';
import Card from '../../../Card/Card';

const UserProfile = props => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // we get access to user id through props here
    // query db and pull user info into state to display
  }, []);

  return (
    <div className="user-profile-wrapper">
      <div className="panel-left">
        <Card>
          <div className="user-profile-container">
            <div className="user-header-wrapper">
              <div className="avatar" />
              <div className="name">
                Michael
                <br />
                Gordon
              </div>
            </div>
            <div className="user-details-wrapper">
              <div className="grid-item">
                <div className="user-info">
                  <span>First Name</span>
                  <span>Michael</span>
                </div>
              </div>
              <div className="grid-item">
                <div className="user-info">
                  <span>Last Name</span>
                  <span>Gordon</span>
                </div>
              </div>
              <div className="grid-item">
                <div className="user-info">
                  <span>Age</span>
                  <span>26</span>
                </div>
              </div>
              <div className="grid-item">
                <div className="user-info">
                  <span>Weight</span>
                  <span>82 kgs</span>
                </div>
              </div>
              <div className="grid-item">
                <div className="user-info">
                  <span>Sex</span>
                  <span>M</span>
                </div>
              </div>
              <div className="grid-item">
                <div className="user-info">
                  <span>DOB</span>
                  <span>9/1/1994</span>
                </div>
              </div>
              <div className="grid-item">
                <div className="user-info">
                  <span>Blood Type</span>
                  <span>A-</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <div className="sub-cards">
          <Card>
            <div className="user-profile-container">
              <div className="user-header-wrapper">
                <h2>Allergies</h2>
              </div>
              <div className="user-details-wrapper">
                <div className="grid-item">
                  <div className="user-info">
                    <span>Type</span>
                    <span>Latex</span>
                  </div>
                </div>
                <div className="grid-item">
                  <div className="user-info">
                    <span>Severity</span>
                    <span>Moderate</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="user-profile-container">
              <div className="user-header-wrapper">
                <h2>Medication</h2>
              </div>
              <div className="user-details-wrapper">
                <div className="grid-item">
                  <div className="user-info">
                    <span>Type</span>
                    <span>Amoxicillin</span>
                  </div>
                </div>
                <div className="grid-item">
                  <div className="user-info">
                    <span>Brand</span>
                    <span>Augmentim</span>
                  </div>
                </div>
                <div className="grid-item">
                  <div className="user-info">
                    <span>Ml</span>
                    <span>500</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Card>
        <div className="user-profile-container">
          <div className="user-header-wrapper">
            <h2>Medical History</h2>
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
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Corrupti, sequi necessitatibus! Qui deserunt, neque est porro
                  minima mollitia temporibus et, provident nemo aliquid
                  voluptate iusto? Facilis, perferendis iusto modi accusantium
                  veniam earum iure perspiciatis excepturi commodi nam possimus
                  a tempora, tempore pariatur quam hic harum! Voluptatem saepe
                  veniam eos soluta eius sed accusamus aperiam itaque, cumque
                  odio ab natus tempora consequuntur ex suscipit impedit numquam
                  iure. Praesentium quae iusto quod minima consequatur porro
                  deserunt ex quam tempore distinctio, recusandae labore
                  inventore corporis assumenda voluptates consequuntur!
                  Voluptatibus, non harum temporibus saepe corrupti maxime
                  fugiat ab aperiam similique ad optio ratione beatae.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
