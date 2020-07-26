import React from 'react';
import './Schedule.scss';
import Button from '../../../Button/Button';
import Image from '../../../../assets/md-19.jpg';

const Schedule = () => {
  const styles = {
    backgroundImage: `url(${Image})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '50px',
    height: '50px',
  };

  return (
    <div className="schedule-wrapper">
      <ul>
        <li>
          <div className="client-wrapper">
            <div className="client">
              <div className="avatar" style={styles} />
              <div className="name">Elmer Osborne</div>
            </div>
            <div className="booking">Mon 26th Jul 11:30 - 12:00pm</div>
            <div className="process">
              <Button action="accept" color="pink" />
              <Button action="decline" color="dark" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Schedule;
