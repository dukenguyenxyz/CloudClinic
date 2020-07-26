import React, { useState, useEffect } from 'react';
import '../../Authentication/Form/Form.scss';
import AuthInput from '../../Authentication/Form/AuthInput/AuthInput';
import AuthSelect from '../../Authentication/Form/AuthSelect/AuthSelect';
import Button from '../../../Button/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Clock } from 'react-feather';
import moment from 'moment';
import { setHours, setMinutes } from 'date-fns';
import axios from 'axios';
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
                  <h4>Select your openning hour</h4>
                  <div className="react-datepicker-master-wrapper">
                    <Clock color="#212429" size={14} />
                    <DatePicker />
                  </div>
                </div>
                <div>
                  <h4>Select your closing hour</h4>
                  <div className="react-datepicker-master-wrapper">
                    <Clock color="#212429" size={14} />
                    <DatePicker />
                  </div>
                </div>
                <div>
                  <h4>Select your lunch break hours</h4>
                  <div className="react-datepicker-master-wrapper">
                    <Clock color="#212429" size={14} />
                    <DatePicker />
                  </div>
                </div>
                <div>
                  <h4>Select any unavailable hours</h4>
                  <div className="react-datepicker-master-wrapper">
                    <Clock color="#212429" size={14} />
                    <DatePicker />
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
                <h1>hello</h1>
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
