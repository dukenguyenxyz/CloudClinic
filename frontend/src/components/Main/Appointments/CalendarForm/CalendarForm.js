import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Clock, Calendar } from 'react-feather';

import 'react-datepicker/dist/react-datepicker.css';
import '../../Authentication/Form/Form.scss';
// import AuthInput from '../../Authentication/Form/AuthInput/AuthInput';
import AuthSelect from '../../Authentication/Form/AuthSelect/AuthSelect';
import Button from '../../../Button/Button';

import moment from 'moment';
// import { setHours, setMinutes } from 'date-fns';
// import axios from 'axios';
import Schedule from '../Schedule/Schedule';
import { RRule, RRuleSet, rrulestr } from 'rrule';
// import { formatTimeHour, formatTimeDate } from '../helpers';

const CalendarForm = ({
  clientFormState,
  setClientFormState,
  handleSelect,
  handleSessionDuration,
  doctorAvailability,
  setDoctorAvailability,
  handleAddClick,
  handleRemoveClick,
  handleUnavailableDateChange,
  user,
  round,
  handleUnavailabilityModifiers,
  handleDoctorAvailabilitySubmit,
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

  const handleSubmit = () => {};

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
    // console.log(doctorAvailability);
    return (
      <div className="tab-wrapper">
        <div className="tab-container">
          <h5
            className={
              tabState.activeTab === 'availability' ? 'active' : undefined
            }
            onClick={() =>
              setTabState({
                activeTab: 'availability',
              })
            }
          >
            Availability
          </h5>
          <h5
            className={tabState.activeTab === 'schedule' ? 'active' : undefined}
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
                            selected={
                              doctorAvailability
                                ? moment(
                                    doctorAvailability.openingTime
                                  ).toDate()
                                : null
                            }
                            onChange={date =>
                              setDoctorAvailability({
                                ...doctorAvailability,
                                errors: [],
                                openingTime: moment(date).toDate(),
                              })
                            }
                            showTimeSelect
                            showTimeSelectOnly
                            placeholder="Opening Time"
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
                            selected={
                              doctorAvailability
                                ? moment(
                                    doctorAvailability.closingTime
                                  ).toDate()
                                : null
                            }
                            onChange={date =>
                              setDoctorAvailability({
                                ...doctorAvailability,
                                errors: [],
                                closingTime: moment(date).toDate(),
                              })
                            }
                            showTimeSelect
                            showTimeSelectOnly
                            placeholder="Opening Time"
                            minTime={
                              doctorAvailability
                                ? moment(doctorAvailability.openingTime)
                                    .add(1, 'hour')
                                    .toDate()
                                : null
                            }
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
                            selected={
                              doctorAvailability
                                ? moment(
                                    doctorAvailability.lunchBreakStart
                                  ).toDate()
                                : null
                            }
                            onChange={date =>
                              setDoctorAvailability({
                                ...doctorAvailability,
                                lunchBreakStart: moment(date).toDate(),
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
                            selected={
                              doctorAvailability
                                ? moment(
                                    doctorAvailability.lunchBreakEnd
                                  ).toDate()
                                : null
                            }
                            onChange={date =>
                              setDoctorAvailability({
                                ...doctorAvailability,
                                lunchBreakEnd: moment(date).toDate(),
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
                    {doctorAvailability &&
                    doctorAvailability.unavailableDateTimes.length > 0 ? (
                      doctorAvailability.unavailableDateTimes.map((el, i) => {
                        return (
                          <div key={i}>
                            <div className="start-end-time-wrapper">
                              <div className="start-end-time-container">
                                <h5>Start date and time</h5>
                                <div className="lunch-time">
                                  <Calendar color="#212429" size={14} />
                                  <DatePicker
                                    selected={
                                      doctorAvailability
                                        ? moment(
                                            doctorAvailability
                                              .unavailableDateTimes[i]
                                              .startDateTime
                                          ).toDate()
                                        : null
                                    }
                                    onChange={date =>
                                      handleUnavailableDateChange(
                                        el,
                                        i,
                                        'unavailableDateTimes',
                                        moment(date).toDate(),
                                        'startDateTime'
                                      )
                                    }
                                    showTimeSelect
                                    minDate={moment().toDate()}
                                    maxDate={moment().add(3, 'year').toDate()}
                                    // // Format ?
                                    minTime={
                                      doctorAvailability
                                        ? moment(
                                            doctorAvailability.openingTime
                                          ).toDate()
                                        : null
                                    }
                                    maxTime={moment()
                                      .hours(23)
                                      .minutes(0)
                                      .toDate()}
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
                                      doctorAvailability
                                        ? moment(
                                            doctorAvailability
                                              .unavailableDateTimes[i]
                                              .endDateTime
                                          ).toDate()
                                        : null
                                    }
                                    onChange={date =>
                                      handleUnavailableDateChange(
                                        el,
                                        i,
                                        'unavailableDateTimes',
                                        moment(date).toDate(),
                                        'endDateTime'
                                      )
                                    }
                                    showTimeSelect
                                    minDate={moment().toDate()}
                                    maxDate={moment().add(3, 'year').toDate()}
                                    // // Format ?
                                    minTime={
                                      doctorAvailability.openingTime
                                        ? moment(
                                            doctorAvailability.openingTime
                                          ).toDate()
                                        : null
                                    }
                                    maxTime={moment()
                                      .hours(23)
                                      .minutes(0)
                                      .toDate()}
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
                                      id="everyWeek"
                                      name={`condition${i}`}
                                      value={RRule.WEEKLY} // RRule.WEEKLY
                                      onChange={e =>
                                        handleUnavailabilityModifiers(
                                          e,
                                          i,
                                          'unavailableDateTimes'
                                        )
                                      }
                                    />
                                    <label htmlFor="female">Every Week</label>
                                  </div>
                                  <div className="option">
                                    <input
                                      type="radio"
                                      id="other"
                                      name={`condition${i}`}
                                      value={RRule.DAILY} // RRule.DAILY
                                      onChange={e =>
                                        handleUnavailabilityModifiers(
                                          e,
                                          i,
                                          'unavailableDateTimes'
                                        )
                                      }
                                    />
                                    <label htmlFor="other">Daily</label>
                                  </div>
                                </div>
                              </div>
                              <div className="grid-item">
                                {doctorAvailability.unavailableDateTimes
                                  .length !== 1 && (
                                  <Button
                                    onClick={() =>
                                      handleRemoveClick(
                                        'unavailableDateTimes',
                                        i
                                      )
                                    }
                                    icon="minus"
                                    color="mid"
                                  />
                                )}
                                {doctorAvailability.unavailableDateTimes
                                  .length -
                                  1 ===
                                  i && (
                                  <Button
                                    onClick={() =>
                                      doctorAvailability.unavailableDateTimes[i]
                                        .startDateTime !== '' &&
                                      handleAddClick('unavailableDateTimes', {
                                        startDateTime: round(
                                          moment(),
                                          moment.duration(15, 'minutes'),
                                          'ceil'
                                        ).toDate(),
                                        endDateTime: round(
                                          moment(),
                                          moment.duration(15, 'minutes'),
                                          'ceil'
                                        ).toDate(),
                                        modifier: '',
                                      })
                                    }
                                    icon="plus"
                                    color="mid"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div id="appointment-form-button-wrapper">
                        <div className="grid-item">
                          <Button
                            onClick={() =>
                              handleAddClick('unavailableDateTimes', {
                                startDateTime: round(
                                  moment(),
                                  moment.duration(15, 'minutes'),
                                  'ceil'
                                ).toDate(),
                                endDateTime: round(
                                  moment(),
                                  moment.duration(15, 'minutes'),
                                  'ceil'
                                ).toDate(),
                                modifier: '',
                              })
                            }
                            icon="plus"
                            color="mid"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="auth-error-wrapper">
                  <ul>
                    {doctorAvailability &&
                      doctorAvailability.errors &&
                      doctorAvailability.errors.map((errorMessage, i) => (
                        <li key={i} className="auth-error-message">
                          {errorMessage}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="form-button-wrapper">
                  <Button
                    action="Confirm"
                    color="pink"
                    onClick={() => handleDoctorAvailabilitySubmit()}
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
