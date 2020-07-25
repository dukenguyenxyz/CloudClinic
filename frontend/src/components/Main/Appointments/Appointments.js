import React, { useContext, useState, useEffect } from 'react';
import MainCalendar from './MainCalendar/MainCalendar';
import './Appointments.scss';
import CalendarForm from './CalendarForm/CalendarForm';
import { AuthContext } from '../../../globalState/index';
import axios from 'axios';
import moment from 'moment';

const Appointments = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [doctorSessions, setDoctorSessions] = useState([]);

  function round(date, duration, method) {
    return moment(Math[method](+date / +duration) * +duration);
  }

  const [formState, setFormState] = useState({
    doctor: '',
    client: user.firstName,
    startTime: round(moment(), moment.duration(15, 'minutes'), 'ceil').toDate(),
    endTime: '',
    sessionDuration: '',
  });

  useEffect(() => {
    getDoctorSessions();
  }, []);

  const getDoctorSessions = async () => {
    const URL = 'http://localhost:5000';
    // const URL = 'cloudclinic00.herokuapp.com';
    const endpoint = `${URL}/api/users/sessions`;
    // const endpoint = `${URL}/api/users/clients/${user._id}`;

    const jwt = localStorage.getItem('jwt');
    await axios
      .get(endpoint, {
        headers: {
          Authorization: `${jwt}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const doctorCalendar = () => {
    return <MainCalendar formState={formState} />;
  };

  const clientCalendar = () => {
    return <MainCalendar formState={formState} />;
  };

  const showCalendar = () => {
    return user.isDoctor ? doctorCalendar() : clientCalendar();
  };

  const handleSelect = (e, key) => {
    setFormState({
      ...formState,
      [key]: e.target.value,
    });
  };

  const handleSessionDuration = (e, duration) => {
    if (e.target.value === duration) {
      const endTime = moment(formState.startTime)
        .add(duration, 'minutes')
        .toDate();

      setFormState({
        ...formState,
        sessionDuration: duration,
        endTime,
      });
    }
  };

  return (
    <div className="appointments-wrapper">
      <section className="calendar-form-wrapper">
        <CalendarForm
          formState={formState}
          setFormState={setFormState}
          handleSelect={handleSelect}
          handleSessionDuration={handleSessionDuration}
        />
      </section>
      {showCalendar()}
    </div>
  );
};

export default Appointments;
