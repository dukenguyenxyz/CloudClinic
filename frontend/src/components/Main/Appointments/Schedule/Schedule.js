import React, { useEffect, useState } from 'react';
import './Schedule.scss';
import Button from '../../../Button/Button';
import Image from '../../../../assets/md-19.jpg';
import axios from 'axios';
import moment from 'moment';

const Schedule = () => {
  const styles = {
    backgroundImage: `url(${Image})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '50px',
    height: '50px',
  };

  const [sessions, setSessions] = useState([
    {
      client: 'E. Osborne',
      startTime: moment().toDate(),
      endTime: moment().add({ minutes: 30 }).toDate(),
      status: 'pending',
    },
  ]);

  useEffect(() => {
    // axios call here
  }, []);

  return (
    <div className="schedule-wrapper">
      <ul>
        {sessions.map(session => {
          return (
            <li>
              <div className="client-wrapper">
                <div className="client">
                  <div className="avatar" style={styles} />
                </div>
                <div className="middle">
                  <div className="name">{session.client}</div>
                  <div className="booking">Mon 26th Jul 11:30 - 12:00pm</div>
                </div>
                <div className="process">
                  <Button
                    action="accept"
                    color="pink"
                    onClick={() =>
                      console.log(
                        'PATCH request to backend to set confirmed to true'
                      )
                    }
                  />
                  <Button
                    action="decline"
                    color="dark"
                    onClick={() =>
                      console.log(
                        'PATCH request to backend to set confirmed to declined'
                      )
                    }
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Schedule;
