import React, { useEffect } from 'react';
import './Schedule.scss';
import Button from '../../../Button/Button';
import Image from '../../../../assets/md-19.jpg';
import moment from 'moment';
import { request } from '../../../AxiosTest/config'; // config.js
import { v4 as uuidv4 } from 'uuid';

const Schedule = ({ user, sessions, setSessions }) => {
  const styles = {
    backgroundImage: `url(${Image})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '50px',
    height: '50px',
  };

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
    if (sessions.length === 0) {
      const getSessions = async () => {
        try {
          const response = await request.get('sessions');

          const sorted = response.data.sort((a, b) =>
            moment(a.createDate).isBefore(moment(b.createDate)) ? 1 : -1
          );
          setSessions(sorted);
        } catch (e) {
          console.log(e);
          // spread the error
        }
      };
      getSessions();
    }
  }, []);

  const DoctorSchedule = () => {
    return (
      <div className="schedule-wrapper">
        <ul>
          {sessions.length > 0 ? (
            sessions.map(session => {
              return (
                <li key={uuidv4()}>
                  <div className="session-container">
                    <div className="status">
                      <span>{session.status}</span>
                    </div>
                    <div className="client-wrapper">
                      <div className="client">
                        <img
                          className="avatar"
                          src={session.user.profileImage}
                          alt=""
                        />
                      </div>
                      <div className="middle">
                        <div className="name">{`${session.user.firstName} ${session.user.lastName}`}</div>
                        <div className="booking">
                          {`${moment(session.startTime).format(
                            'ddd Mo MMM hh:mm'
                          )} - ${moment(session.endTime).format('hh:mm A')}`}
                        </div>
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
            })
          ) : (
            <div className="session-container">
              <h3 className="no-appointments">No appointments scheduled</h3>
            </div>
          )}
        </ul>
      </div>
    );
  };

  const ClientSchedule = () => {
    return (
      <div className="schedule-wrapper">
        <ul>
          {sessions.length > 0 ? (
            sessions.map(session => {
              return (
                <li key={uuidv4()}>
                  <div className="session-container">
                    <div className="status">
                      <span>{session.status}</span>
                    </div>
                    <div className="client-wrapper">
                      <div className="client">
                        <img
                          className="avatar"
                          src={session.user.profileImage}
                          alt=""
                        />
                      </div>
                      <div className="middle">
                        <div className="name">{`Dr. ${session.user.firstName} ${session.user.lastName}`}</div>
                        <div className="booking">
                          {`${moment(session.startTime).format(
                            'ddd Mo MMM hh:mm'
                          )} - ${moment(session.endTime).format('hh:mm A')}`}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <div className="session-container">
              <h3 className="no-appointments">No appointments scheduled</h3>
            </div>
          )}
        </ul>
      </div>
    );
  };

  const showSchedule = () => {
    return user.isDoctor ? DoctorSchedule() : ClientSchedule();
  };
  return showSchedule();
};

export default Schedule;
