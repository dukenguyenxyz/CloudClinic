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

  const [clientFormState, setClientFormState] = useState({
    doctor: '',
    client: user.firstName,
    startTime: round(moment(), moment.duration(15, 'minutes'), 'ceil').toDate(),
    endTime: '',
    sessionDuration: '',
  });

  const [doctorAvailability, setDoctorAvailability] = useState({
    openningTime: moment().set({ hour: 6, minute: 0 }).toDate(),
    closingTime: moment().set({ hour: 18, minute: 0 }).toDate(),
    lunchBreakStart: moment().set({ hour: 12, minute: 0 }).toDate(),
    lunchBreakEnd: moment().set({ hour: 13, minute: 0 }).toDate(),
    unavailableDateTimes: [
      { startDateTime: moment().toDate(), endDateTime: moment().toDate() },
    ],
    rrule: '',
  });

  useEffect(() => {
    getDoctorSessions();
  }, []);

  const getDoctorSessions = async () => {
    const URL = 'http://localhost:5000';
    // const URL = 'cloudclinic00.herokuapp.com';
    const endpoint = `${URL}/api/sessions/`;

    const jwt = localStorage.getItem('jwt');
    console.log(jwt);
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

  const handleSelect = (e, key) => {
    setClientFormState({
      ...clientFormState,
      [key]: e.target.value,
    });
  };

  const handleAddClick = (key, formFieldsObject) => {
    setDoctorAvailability({
      ...doctorAvailability,
      [key]: [...doctorAvailability[key], formFieldsObject],
    });
  };

  const handleRemoveClick = (key, i) => {
    //spread value at the formState key into list
    const list = [...doctorAvailability[key]];

    //at index i, remove one item
    list.splice(i, 1);
    setDoctorAvailability({
      ...doctorAvailability,
      [key]: list,
    });
  };

  const handleSessionDuration = (e, duration) => {
    if (e.target.value === duration) {
      const endTime = moment(clientFormState.startTime)
        .add(duration, 'minutes')
        .toDate();

      setClientFormState({
        ...clientFormState,
        sessionDuration: duration,
        endTime,
      });
    }
  };

  const doctorAppointments = () => {
    return (
      <div className="appointments-wrapper">
        <section className="calendar-form-wrapper">
          <CalendarForm
            doctorAvailability={doctorAvailability}
            setDoctorAvailability={setDoctorAvailability}
            user={user}
            handleAddClick={handleAddClick}
            handleRemoveClick={handleRemoveClick}
          />
        </section>
        <MainCalendar doctorAvailability={doctorAvailability} />
      </div>
    );
  };

  const clientAppointments = () => {
    return (
      <div className="appointments-wrapper">
        <section className="calendar-form-wrapper">
          <CalendarForm
            clientFormState={clientFormState}
            setClientFormState={setClientFormState}
            handleSelect={handleSelect}
            handleSessionDuration={handleSessionDuration}
            user={user}
          />
        </section>
        <MainCalendar clientFormState={clientFormState} />
      </div>
    );
  };

  const showAppointmentView = () => {
    return user.isDoctor ? doctorAppointments() : clientAppointments();
  };

  return showAppointmentView();
};

export default Appointments;
