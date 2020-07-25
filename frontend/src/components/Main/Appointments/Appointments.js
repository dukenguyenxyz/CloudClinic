import React, { useContext, useState, useEffect } from 'react';
import MainCalendar from './MainCalendar/MainCalendar';
import './Appointments.scss';
import CalendarForm from './CalendarForm/CalendarForm';
import { AuthContext } from '../../../globalState/index';

const Appointments = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    doctor: '',
    client: user.firstName,
    startTime: new Date(),
    endTime: new Date(),
  });

  useEffect(() => {
    //request doctor sessions
  }, []);

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

  const handleSessionDuration = e => {
    console.log(e.target.value);
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
