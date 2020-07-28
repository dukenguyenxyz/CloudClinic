import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
// import events from './events';
import { sampleArr as mockAPISessions } from './events';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { viewSessions } from '../../../AxiosTest/sessionRoutes';

const localizer = momentLocalizer(moment);

const MainCalendar = ({ formState }) => {
  const [calendarState, setCalendarState] = useState([
    {
      id: 15,
      title: 'Point in Time Event',
      start: moment().toDate(),
      end: moment().toDate(),
    },
  ]);
  // const [calendarState, setCalendarState] = useState([]);

  useEffect(() => {
    // async function getSessions() {
    //   const response = await viewSessions(() => {}, mockAPISessions);
    //   setCalendarState(response);
    // }
    // getSessions();
  }, []);

  return (
    <div>
      <div
        style={{
          height: '90vh',
        }}
      >
        <Calendar
          events={calendarState}
          startAccessor="start"
          endAccessor="end"
          defaultDate={moment().toDate()}
          localizer={localizer}
          defaultView="work_week"
          views={['month', 'day', 'work_week']}
        />
      </div>
    </div>
  );
};

export default MainCalendar;
