import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import events from './events';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MainCalendar = ({ formState }) => {
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
      <div
        style={{
          height: '100vh',
        }}
      >
        <Calendar
          events={state.events}
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
