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
  formState,
  setFormState,
  handleSelect,
  handleSessionDuration,
}) => {
  const doctors = ['Dr. Fizz', 'Dr. James', 'Dr. Foo', 'Dr. Bar'];

  const [startDate, setStartDate] = useState(new Date());
  const [doctorSessions, setDoctorSessions] = useState([]);

  let handleColor = time => {
    return time.getHours() > 12 ? 'text-success' : 'text-error';
  };

  useEffect(() => {
    // Requst doctor sessions
    // set doctorSessions
    console.log(moment().add(1, 'hour').toDate());
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
            value={formState.doctor}
            placeholder="Doctor"
            type="text"
            icon="userPlus"
            directive="doctor"
            options={doctors}
            onValueChange={e => handleSelect(e, 'doctor')}
          />
          <div className="react-datepicker-master-wrapper">
            <label htmlFor="date" className="date-label">
              Select an appointment
            </label>
            <Clock color="#212429" size={14} />
            <DatePicker
              name="date"
              showTimeSelect
              selected={formState.startTime}
              minDate={moment().toDate()}
              minTime={moment().hours(8).minutes(0)._d}
              maxTime={moment().hours(17).minutes(0)._d}
              // excludeDates={[new Date(), subDays(new Date(), 1)]}
              excludeTimes={[moment().add(1, 'hour').toDate()]}
              // excludeTimes={santizeDoctorSessions()}
              onChange={date =>
                setFormState({
                  ...formState,
                  startTime: date,
                })
              }
              timeClassName={handleColor}
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
          <fieldset className="appointment-time-slot-wrapper">
            <div className="time-slot">
              <div>
                <input
                  type="radio"
                  name="duration"
                  id=""
                  value="15"
                  onChange={e => handleSessionDuration(e)}
                />
                <span>15 min</span>
              </div>
              {/* <span>{`${moment()}`}</span> */}
              <span className="appointment-time">Monday 26th 9:30 - 10:00</span>
            </div>
            <div className="time-slot">
              <div>
                <input
                  type="radio"
                  name="duration"
                  id=""
                  value="30"
                  onChange={e => handleSessionDuration(e)}
                />
                <span>30 min</span>
              </div>
              {/* <span>{`${moment()}`}</span> */}
              <span className="appointment-time">Monday 26th 9:30 - 10:00</span>
            </div>
            <div className="time-slot">
              <div>
                <input
                  type="radio"
                  name="duration"
                  id=""
                  value="60"
                  onChange={e => handleSessionDuration(e)}
                />
                <span>60 min</span>
              </div>
              {/* <span>{`${moment()}`}</span> */}
              <span className="appointment-time">Monday 26th 9:30 - 10:00</span>
            </div>
          </fieldset>
        </div>
        <div className="auth-error-wrapper">
          <ul>
            {/* {formState.errors.map((errorMessage, i) => (
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

export default CalendarForm;
