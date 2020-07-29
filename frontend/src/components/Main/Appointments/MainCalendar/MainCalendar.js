import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
// import events from './events';
import { sampleArr as mockAPISessions } from './events';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { viewSessions } from '../../../AxiosTest/sessionRoutes';
import { sampleArr, convertAPIdataToJS } from './events';

const localizer = momentLocalizer(moment);

const MainCalendar = ({ unavailabilities, doctorAvailability }) => {
  // const [calendarState, setCalendarState] = useState([
  //   {
  //     id: 15,
  //     title: 'Point in Time Event',
  //     start: moment().toDate(),
  //     end: moment().toDate(),
  //   },
  // ]);

  // useEffect(() => {}, []);

  // console.log(unavailabilities);

  return (
    <div>
      <div
        style={{
          height: '90vh',
        }}
      >
        <Calendar
          events={unavailabilities}
          startAccessor="start"
          endAccessor="end"
          defaultDate={moment().toDate()}
          localizer={localizer}
          defaultView="work_week"
          views={['month', 'day', 'work_week']}
          min={
            doctorAvailability.openningTime
              ? moment(doctorAvailability.openningTime).toDate()
              : undefined
          }
          max={
            doctorAvailability.closingTime
              ? moment(doctorAvailability.closingTime).toDate()
              : undefined
          }
        />
      </div>
    </div>
  );
};

export default MainCalendar;
