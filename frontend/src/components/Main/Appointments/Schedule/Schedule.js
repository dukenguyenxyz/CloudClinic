import React, { useEffect, useState } from 'react';
import './Schedule.scss';
import Button from '../../../Button/Button';
import Image from '../../../../assets/md-19.jpg';
import axios from 'axios';
import moment from 'moment';
import { request } from '../../../AxiosTest/config'; // config.js
import { v4 as uuidv4 } from 'uuid';

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

  const handleAccept = async () => {
    // try {
    //   const id
    //   const response = await request.post(`sessions/${id}/accept`);
    // } catch (e) {}
  };

  const handleDecline = async () => {
    // try {
    // } catch (e) {}
  };

  useEffect(() => {
    // axios call here
    const getSessions = async () => {
      try {
        // const response = await request.get('sessions');
        const response = await axios.get('sessions');
        console.log(response);
        setSessions(response.data);
      } catch (e) {
        console.log(e);
        // spread the error
      }
    };
    getSessions();
  }, []);

  return (
    <div className="schedule-wrapper">
      <ul>
        {sessions.map(session => {
          return (
            <li key={uuidv4()}>
              <div className="session-container">
                <div className="status"></div>
                  <span>pending</span>
                </div>
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
                      onClick={() => handleAccept()}
                    />
                    <Button
                      action="decline"
                      color="dark"
                      onClick={() => handleDecline()}
                    />
                  </div>
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
