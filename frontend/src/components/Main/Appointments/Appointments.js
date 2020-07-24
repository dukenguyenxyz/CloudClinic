import React from 'react';
import MainCalendar from './MainCalendar/MainCalendar';
import './Appointments.scss';

const Appointments = ({}) => {
  return (
    <div className="appointments-wrapper">
      <MainCalendar />
    </div>
  );
};

export default Appointments;
