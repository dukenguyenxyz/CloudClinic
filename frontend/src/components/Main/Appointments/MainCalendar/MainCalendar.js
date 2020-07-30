// prettier-ignore

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import mockEvents from '../Samples/sampleEvents';
import mockRealEvents from '../Samples/sampleEventsReal';
import mockReal2Events from '../Samples/sampledata';

// import { sampleArr as mockAPISessions, convertAPIdataToJS } from '../helpers';
// import { viewSessions } from '../../../AxiosTest/sessionRoutes';

const localizer = momentLocalizer(moment);

// events = unavailabilities.map(mapToRBCFormat)
// const mapToRBCFormat = e =>
//   Object.assign({}, e, {
//     start: moment(e.start, moment.ISO_8601).toDate(),
//     end: moment(e.end, moment.ISO_8601).toDate(),
//   });

const mapToRBCFormat = e =>
  Object.assign({}, e, {
    start: moment(e.start)._d,
    end: moment(e.end)._d,
  });

  delete newDateObj.same;

  return newDateObj;
};

const mappedData = mockRealEvents.map(mapToRBCFormat);

const MainCalendar = ({ unavailabilities, doctorAvailability }) => {
  const [calendarState, setCalendarState] = useState([]);

  // useEffect(() => {
  //   // setCalendarState(unavailabilities.map(mapToRBCFormat));
  // }, [unavailabilities]);

  return (
    <div>
      <div
        style={{
          height: '90vh',
        }}
      >
        <Calendar
          // events={mockEvents}
          events={mockReal2Events.map(mapToRBCFormat)} // mockEvents
          // events={calendarState}
          // events={unavailabilities.map(mapToRBCFormat)}
          startAccessor="start"
          endAccessor="end"
          defaultDate={moment().toDate()}
          localizer={localizer}
          defaultView="work_week"
          views={['month', 'day', 'work_week']}
          min={
            doctorAvailability.openingTime
              ? moment(doctorAvailability.openingTime).toDate()
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
