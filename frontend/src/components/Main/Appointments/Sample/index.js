import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import events from './events';
import './style.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MainCalendar = () => {
  const [state, setState] = useState({
    name: 'React',
    events,
  });

  useEffect(() => {
    // make axios call for events
    // await response
    // setState with data
  }, []);

  return (
    <div>
      <p> A test for the React Big Calendar. </p>
      <div
        style={{
          height: '500pt',
        }}
      >
        <Calendar
          events={state.events}
          startAccessor="start"
          endAccessor="end"
          defaultDate={moment().toDate()}
          localizer={localizer}
        />
      </div>
    </div>
  );
};

export default MainCalendar;
