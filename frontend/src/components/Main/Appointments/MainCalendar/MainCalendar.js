// prettier-ignore

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import mockEvents from '../Samples/sampleEvents';
import mockRealEvents from '../Samples/sampleEventsReal';

// import { sampleArr as mockAPISessions, convertAPIdataToJS } from '../helpers';
// import { viewSessions } from '../../../AxiosTest/sessionRoutes';

const localizer = momentLocalizer(moment);

// events = unavailabilities.map(mapToRBCFormat)
const mapToRBCFormat = (e, i) => {
  const newDateObj = Object.assign({}, e, {
    id: i, // convert into a number
    start: new Date(e.start), // moment(e.start).toDate(), // moment.ISO_8601
    end: new Date(e.end), // moment(e.end).toDate(),
  });

  delete newDateObj.same;

  return newDateObj;
};

const mappedData = mockRealEvents.map(mapToRBCFormat);

const MainCalendar = ({ unavailabilities, doctorAvailability }) => {
  const now = new Date();

  const [calendarState, setCalendarState] = useState([]);

  useEffect(() => {
    // setCalendarState(unavailabilities.map(mapToRBCFormat));
  }, [unavailabilities]);

  return (
    <div>
      <div
        style={{
          height: '90vh',
        }}
      >
        <Calendar
          // events={mockEvents}
          // events={mappedData} // mockEvents
          events={calendarState}
          startAccessor="start"
          endAccessor="end"
          defaultDate={moment().toDate()}
          localizer={localizer}
          defaultView="work_week"
          views={['month', 'day', 'work_week']}
          // min={
          //   doctorAvailability.openingTime
          //     ? moment(doctorAvailability.openingTime).toDate()
          //     : undefined
          // }
          // max={
          //   doctorAvailability.closingTime
          //     ? moment(doctorAvailability.closingTime).toDate()
          //     : undefined
          // }
        />
      </div>
    </div>
  );
};

export default MainCalendar;
