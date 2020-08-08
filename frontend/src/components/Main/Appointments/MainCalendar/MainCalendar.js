// prettier-ignore

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import _ from 'lodash';
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

const mapToRBCFormat = e => {
  const newDateObj = Object.assign({}, e, {
    start: moment(e.start)._d,
    end: moment(e.end)._d,
  });

  // delete newDateObj.same;

  return newDateObj;
};

const mappedData = mockRealEvents.map(mapToRBCFormat);

const MainCalendar = ({
  unavailabilities,
  doctorAvailability,
  user,
  selectedDoctor,
  setUnavailabilities,
  setClientFormState,
  clientFormState,
}) => {
  const [calendarState, setCalendarState] = useState([]);

  const handleSelect = ({ start, end }) => {
    for (let el in unavailabilities) {
      if (
        moment(end).isBetween(
          moment(unavailabilities[el].start),
          moment(unavailabilities[el].end)
        ) ||
        moment(start).isBetween(
          moment(unavailabilities[el].start),
          moment(unavailabilities[el].end)
        ) ||
        (moment(end).isSameOrAfter(unavailabilities[el].start) &&
          moment(start).isSameOrBefore(unavailabilities[el].start))
      ) {
        alert('Appointments cannot overlap with doctor unavailability');
        setClientFormState({
          ...clientFormState,
          errors: ['Appointments cannot overlap with doctor unavailability'],
        });
        return null;
      }
    }

    if (moment(end).diff(start, 'minutes') <= 60) {
      const title = window.prompt('New Event name');
      if (title) {
        if (
          unavailabilities[unavailabilities.length - 1].unavailable !==
          'unavailable'
        ) {
          const oldUnavailabilities = unavailabilities.slice();
          oldUnavailabilities.pop();

          setUnavailabilities([
            ...oldUnavailabilities,
            {
              start,
              end,
              title,
            },
          ]);

          setClientFormState({
            ...clientFormState,
            startTime: start,
            endTime: end,
            sessionDuration: moment(end).diff(start, 'minutes'),
          });
        } else {
          setUnavailabilities([
            ...unavailabilities,
            {
              start,
              end,
              title,
            },
          ]);

          setClientFormState({
            ...clientFormState,
            startTime: start,
            endTime: end,
            sessionDuration: moment(end).diff(start, 'minutes'),
          });
        }
      } else {
        alert('Please only select an appoitnment time between 30 and 60 mins');
      }
    }
  };

  const handleEventStyle = event => {
    // console.log(event);
    const newStyle = {
      backgroundColor: '#cccccc',
      color: '#cccccc',
    };

    if (event.unavailable) {
      return {
        className: '',
        style: newStyle,
      };
    }
  };

  const handleShowMonday = () => {
    const monday = 1;
    const today = moment().isoWeekday();

    if (today === 6) {
      return moment().add({ day: 2 }).toDate();
    }

    if (today === 7) {
      return moment().add({ day: 1 }).toDate();
    }

    return moment().toDate();
  };

  const renderClientCalendar = () => {
    return (
      <div>
        <div
          style={{
            height: '90vh',
          }}
        >
          <Calendar
            onSelectEvent={event => alert('Unavailable')}
            onSelectSlot={e => handleSelect(e)}
            // onSelectSlot={e => console.log(e)}
            selectable="ignoreEvents"
            ignoreEvents
            defaultDate={handleShowMonday()}
            eventPropGetter={event => handleEventStyle(event)}
            events={unavailabilities.map(mapToRBCFormat)}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            localizer={localizer}
            defaultView="work_week"
            views={['day', 'work_week']}
            min={
              !_.isEmpty(selectedDoctor) &&
              selectedDoctor.doctorInfo.workSchedule.openingTime
                ? moment(
                    selectedDoctor.doctorInfo.workSchedule.openingTime
                  ).toDate()
                : undefined
            }
            max={
              !_.isEmpty(selectedDoctor) &&
              selectedDoctor.doctorInfo.workSchedule.closingTime
                ? moment(
                    selectedDoctor.doctorInfo.workSchedule.closingTime
                  ).toDate()
                : undefined
            }
          />
        </div>
      </div>
    );
  };

  const renderDoctorCalendar = () => {
    return (
      <div>
        <div
          style={{
            height: '90vh',
          }}
        >
          <Calendar
            events={unavailabilities.map(mapToRBCFormat)}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            localizer={localizer}
            defaultView="work_week"
            views={['day', 'work_week']}
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

  const showCalendarView = () => {
    return user.isDoctor ? renderDoctorCalendar() : renderClientCalendar();
  };

  return showCalendarView();
};

export default MainCalendar;
