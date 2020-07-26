import React, { useState, useEffect } from 'react';
import '../../Authentication/Form/Form.scss';
import AuthInput from '../../Authentication/Form/AuthInput/AuthInput';
import AuthSelect from '../../Authentication/Form/AuthSelect/AuthSelect';
import Button from '../../../Button/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Clock, Calendar } from 'react-feather';
import moment from 'moment';
import { setHours, setMinutes } from 'date-fns';
import axios from 'axios';
import Schedule from '../Schedule/Schedule';

const CalendarForm = ({
  clientFormState,
  setClientFormState,
  handleSelect,
  handleSessionDuration,
  doctorAvailability,
  setDoctorAvailability,
  user,
}) => {
  const doctors = ['Dr. Fizz', 'Dr. James', 'Dr. Foo', 'Dr. Bar'];

  const [tabState, setTabState] = useState({
    activeTab: 'availability',
  });
  const [doctorSessions, setDoctorSessions] = useState([]);

  let handleColor = time => {
    return time.getHours() > 12 ? 'text-success' : 'text-error';
  };

  useEffect(() => {
    // Requst doctor sessions
    // set doctorSessions
    // console.log(moment().add(1, 'hour').toDate());
  }, []);

  const handleSubmit = () => {
    const developmentUrl = 'http://localhost:5000';
    // const productionUrl = 'http://cloudclinic.tech';
    const endpoint = `${developmentUrl}/api/sessions/`;

    // maybe we should set jwt in authcontext state when user first loads application?
    const jwt = localStorage.getItem('jwt');

    axios
      .patch(
        endpoint,
        {},
        {
          headers: {
            Authorization: `${jwt}`,
            'Content-Type': 'application/json; charset=utf-8',
          },
        }
      )
      .then(response => {
        console.log(response.data);
        // navigate('/<some path>');
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const santizeDoctorSessions = () => {
    // loop over doctorSessions array
    // forEach session use moment to conver it into format for datetime picker
    // return a new array with the formatted date/times
  };

  const displaySessionTime = () => {
    if (clientFormState.startTime) {
      const sessionStart = moment(clientFormState.startTime).format(
        'dddd Do MMM h:mm'
      );
      const sessionEnd = moment(clientFormState.endTime).format('h:mm a');
      return `${sessionStart} - ${sessionEnd}`;
    } else {
      return '';
    }
  };

  const DoctorForm = () => {
    return (
      <div className="tab-wrapper">
        <div className="tab-container">
          <h5
            className={tabState.activeTab === 'availability' && 'active'}
            onClick={() =>
              setTabState({
                activeTab: 'availability',
              })
            }
          >
            Availability
          </h5>
          <h5
            className={tabState.activeTab === 'schedule' && 'active'}
            onClick={() =>
              setTabState({
                activeTab: 'schedule',
              })
            }
          >
            Schedule
          </h5>
        </div>
        <div className="form-wrapper">
          <div className="tabs"></div>
          <div className="trim" />
          <div className="form-container">
            {tabState.activeTab === 'availability' ? (
              <React.Fragment>
                <div className="form-header">
                  <h1>Set your availability</h1>
                </div>
                <div>
                  <h4>Select your working hours</h4>
                  <div className="react-datepicker-master-wrapper">
                    <div className="start-end-time-wrapper">
                      <div className="start-end-time-container">
                        <h5>Open</h5>
                        <div className="lunch-time">
                          <Clock color="#212429" size={14} />
                          <DatePicker
                            selected={doctorAvailability.openningTime}
                            onChange={date =>
                              setDoctorAvailability({
                                ...doctorAvailability,
                                openningTime: date,
                              })
                            }
                            showTimeSelect
                            showTimeSelectOnly
                            minTime={moment().hours(5).minutes(0)._d}
                            maxTime={moment().hours(22).minutes(0)._d}
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                          />
                        </div>
                      </div>
                      <div className="start-end-time-container">
                        <h5>Close</h5>
                        <div className="lunch-time">
                          <Clock color="#212429" size={14} />
                          <DatePicker
                            selected={doctorAvailability.closingTime}
                            onChange={date =>
                              setDoctorAvailability({
                                ...doctorAvailability,
                                closingTime: date,
                              })
                            }
                            showTimeSelect
                            showTimeSelectOnly
                            minTime={doctorAvailability.openningTime}
                            maxTime={moment().hours(23).minutes(0)._d}
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4>Select your lunch break hours</h4>
                  <div className="react-datepicker-master-wrapper">
                    <div className="start-end-time-wrapper">
                      <div className="start-end-time-container">
                        <h5>Start</h5>
                        <div className="lunch-time">
                          <Clock color="#212429" size={14} />
                          <DatePicker
                            selected={doctorAvailability.lunchBreakStart}
                            onChange={date =>
                              setDoctorAvailability({
                                ...doctorAvailability,
                                lunchBreakStart: date,
                              })
                            }
                            showTimeSelect
                            showTimeSelectOnly
                            minTime={moment().hours(10).minutes(0)._d}
                            maxTime={moment().hours(16).minutes(0)._d}
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                          />
                        </div>
                      </div>
                      <div className="start-end-time-container">
                        <h5>End</h5>
                        <div className="lunch-time">
                          <Clock color="#212429" size={14} />
                          <DatePicker
                            selected={doctorAvailability.lunchBreakEnd}
                            onChange={date =>
                              setDoctorAvailability({
                                ...doctorAvailability,
                                lunchBreakEnd: date,
                              })
                            }
                            showTimeSelect
                            showTimeSelectOnly
                            minTime={moment().hours(10).minutes(0)._d}
                            maxTime={moment().hours(16).minutes(0)._d}
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4>Select your unavailability</h4>
                  <div className="react-datepicker-master-wrapper">
                    <div className="start-end-time-wrapper">
                      <div className="start-end-time-container">
                        <h5>Start date and time</h5>
                        <div className="lunch-time">
                          <Calendar color="#212429" size={14} />
                          <DatePicker
                            selected={
                              doctorAvailability.unavailableDateTimes[0]
                                .startDateTime
                            }
                            // onChange={date =>
                            //   setDoctorAvailability({
                            //     ...doctorAvailability,
                            //     lunchBreakStart: date,
                            //   })
                            // }
                            showTimeSelect
                            minTime={moment().hours(10).minutes(0)._d}
                            maxTime={moment().hours(16).minutes(0)._d}
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="MMMM d, h:mm aa"
                          />
                        </div>
                      </div>
                      <div className="start-end-time-container">
                        <h5>End date and time</h5>
                        <div className="lunch-time">
                          <Calendar color="#212429" size={14} />
                          <DatePicker
                            selected={
                              doctorAvailability.unavailableDateTimes[0]
                                .startDateTime
                            }
                            // onChange={date =>
                            //   setDoctorAvailability({
                            //     ...doctorAvailability,
                            //     lunchBreakEnd: date,
                            //   })
                            // }
                            showTimeSelect
                            minTime={moment().hours(10).minutes(0)._d}
                            maxTime={moment().hours(16).minutes(0)._d}
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="MMMM d, h:mm aa"
                          />
                        </div>
                      </div>
                    </div>
                    <div id="appointment-form-button-wrapper">
                      <div className="grid-item">
                        <div className="radio-group">
                          <div className="option">
                            <input
                              type="radio"
                              id="allDay"
                              name="condition"
                              value="allDay"
                            />
                            <label htmlFor="allDay">All Day</label>
                          </div>
                          <div className="option">
                            <input
                              type="radio"
                              id="everyWeek"
                              name="condition"
                              value="everyWeek"
                            />
                            <label htmlFor="female">Every Week</label>
                          </div>
                          <div className="option">
                            <input
                              type="radio"
                              id="other"
                              name="condition"
                              value="daily"
                            />
                            <label htmlFor="other">Daily</label>
                          </div>
                        </div>

                        {/* <Button action="Custom" color="mid" icon="" /> */}
                      </div>
                      <div className="grid-item">
                        <Button icon="plus" color="dark" />
                        <Button icon="minus" color="navy" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="auth-error-wrapper">
                  <ul>
                    {/* {clientFormState.errors.map((errorMessage, i) => (
              <li key={i} className="auth-error-message">
                {errorMessage}
              </li>
            ))} */}
                  </ul>
                </div>
                <div className="form-button-wrapper">
                  <Button
                    action="Confirm"
                    color="pink"
                    // onClick={handleSubmit}
                    icon="check"
                  />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Schedule />
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ClientForm = () => {
    return (
      <div className="form-wrapper">
        <div className="trim" />
        <div className="form-container">
          <div className="form-header">
            <h1>Make an appointment</h1>
          </div>
          <div>
            <AuthSelect
              // name="Doctor"
              value={clientFormState.doctor}
              placeholder="Doctor"
              type="text"
              icon="userPlus"
              directive="doctor"
              options={doctors}
              onValueChange={e => handleSelect(e, 'doctor')}
            />
            <h4>Select an appointment date and time</h4>
            <div className="react-datepicker-master-wrapper">
              {/* <label htmlFor="date" className="date-label">
              Select an appointment
            </label> */}
              <Clock color="#212429" size={14} />
              <DatePicker
                name="date"
                popperPlacement="bottom-end"
                placeholderText="Click to select a date and time"
                showTimeSelect
                selected={clientFormState.startTime}
                minDate={moment().toDate()}
                maxDate={moment().add(1, 'year').toDate()}
                minTime={moment().hours(8).minutes(0)._d}
                maxTime={moment().hours(17).minutes(0)._d}
                // excludeDates={[new Date(), subDays(new Date(), 1)]}
                excludeTimes={[moment().add(1, 'hour').toDate()]}
                // excludeTimes={santizeDoctorSessions()}
                onChange={date =>
                  setClientFormState({
                    ...clientFormState,
                    startTime: date,
                    endTime: moment(date)
                      .add(clientFormState.sessionDuration, 'minutes')
                      .toDate(),
                  })
                }
                timeClassName={handleColor}
                dateFormat="MMMM d, h:mm aa"
              />
            </div>
            <h4>Select a duration</h4>
            <fieldset className="appointment-time-slot-wrapper">
              <div className="time-slot">
                <div>
                  <input
                    type="radio"
                    name="duration"
                    id=""
                    value="15"
                    onChange={e => handleSessionDuration(e, '15')}
                  />
                  <span>15 min</span>
                </div>
                <span className="appointment-time">
                  {clientFormState.sessionDuration === '15'
                    ? displaySessionTime()
                    : ''}
                </span>
              </div>
              <div className="time-slot">
                <div>
                  <input
                    type="radio"
                    name="duration"
                    id=""
                    value="30"
                    onChange={e => handleSessionDuration(e, '30')}
                  />
                  <span>30 min</span>
                </div>
                <span className="appointment-time">
                  {clientFormState.sessionDuration === '30'
                    ? displaySessionTime()
                    : ''}
                </span>
              </div>
              <div className="time-slot">
                <div>
                  <input
                    type="radio"
                    name="duration"
                    id=""
                    value="60"
                    onChange={e => handleSessionDuration(e, '60')}
                  />
                  <span>60 min</span>
                </div>
                <span className="appointment-time">
                  {clientFormState.sessionDuration === '60'
                    ? displaySessionTime()
                    : ''}
                </span>
              </div>
            </fieldset>
          </div>
          <div className="auth-error-wrapper">
            <ul>
              {/* {clientFormState.errors.map((errorMessage, i) => (
              <li key={i} className="auth-error-message">
                {errorMessage}
              </li>
            ))} */}
            </ul>
          </div>
          <div className="form-button-wrapper">
            <Button
              action="Confirm"
              color="pink"
              onClick={handleSubmit}
              icon="check"
            />
          </div>
        </div>
      </div>
    );
  };

  const showForm = () => {
    return user.isDoctor ? DoctorForm() : ClientForm();
  };
  return showForm();
};

export default CalendarForm;
