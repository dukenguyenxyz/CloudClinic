// prettier-ignore

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import mockEvents from '../Samples/sampleEvents';
import mockRealEvents from '../Samples/sampleEventsReal';
import mockReal2Events from '../Samples/sampledata';

const localizer = momentLocalizer(moment);

const mapToRBCFormat = e => {
  const newDateObj = Object.assign({}, e, {
    start: moment(e.start)._d,
    end: moment(e.end)._d,
  });

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
  const [currentDay, setCurrentDay] = useState(moment().toDate());

  useEffect(() => {
    // if current day is saturday or sunday add 1 or 2 days
    if (moment(currentDay).isoWeekday() === 6) {
      setCurrentDay(moment().add({ day: 2 }).toDate());
    }

    if (moment(currentDay).isoWeekday() === 7) {
      setCurrentDay(moment().add({ day: 1 }).toDate());
    }
  }, []);

  const handleSelectClient = ({ start, end }) => {
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
        alert(
          "Appointments cannot overlap with your doctor's unavailability or exisiting time slot"
        );
        setClientFormState({
          ...clientFormState,
          errors: [
            "Appointments cannot overlap with your doctor's unavailability or exisiting time slot",
          ],
        });
        return null;
      }
    }

    if (moment(end).diff(start, 'minutes') <= 60) {
      const name = window.prompt('Please enter your name');
      if (name) {
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
              title: name,
            },
          ]);

          setClientFormState({
            ...clientFormState,
            startTime: start,
            endTime: end,
            sessionDuration: moment(end).diff(start, 'minutes').toString(),
            errors: [],
          });
        } else {
          setUnavailabilities([
            ...unavailabilities,
            {
              start,
              end,
              title: name,
            },
          ]);

          setClientFormState({
            ...clientFormState,
            startTime: start,
            endTime: end,
            sessionDuration: moment(end).diff(start, 'minutes').toString(),
            errors: [],
          });
        }
      } else if (!name && moment(end).diff(start, 'minutes') <= 60) {
        alert('Please enter your name for the appointment');
      } else {
        alert('Please only select an appoitnment time between 30 and 60 mins');
      }
    }
  };

  const handleSelectDoctor = ({ start, end }) => {
    // for (let el in unavailabilities) {
    //   if (
    //     moment(end).isBetween(
    //       moment(unavailabilities[el].start),
    //       moment(unavailabilities[el].end)
    //     ) ||
    //     moment(start).isBetween(
    //       moment(unavailabilities[el].start),
    //       moment(unavailabilities[el].end)
    //     ) ||
    //     (moment(end).isSameOrAfter(unavailabilities[el].start) &&
    //       moment(start).isSameOrBefore(unavailabilities[el].start))
    //   ) {
    //     alert(
    //       "Unavailabilities cannot overlap with exisiting time slot"
    //     );
    //     setClientFormState({
    //       ...clientFormState,
    //       errors: [
    //         "Appointments cannot overlap with your doctor's unavailability or exisiting time slot",
    //       ],
    //     });
    //     return null;
    //   }
    // }
  };

  const handleEventStyle = event => {
    // unavailable grey block
    const newStyle = {
      backgroundColor: '#cccccc',
      color: '#cccccc',
    };

    if (event.status === 'unavailable') {
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

  const handleSelectedEvent = event => {
    console.log(event);
    if (
      event.title.toLowerCase() === 'unavailable' ||
      event.title.toLowerCase() === 'lunch break'
    ) {
      alert('unavailable');
    } else {
      console.log('hello world');
    }
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
            date={currentDay}
            onNavigate={date => setCurrentDay(date)}
            onSelectEvent={event => handleSelectedEvent(event)}
            onSelectSlot={e =>
              !_.isEmpty(selectedDoctor) && handleSelectClient(e)
            }
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
            date={currentDay}
            onNavigate={date => setCurrentDay(date)}
            onSelectEvent={event => handleSelectedEvent(event)}
            onSelectSlot={e => handleSelectDoctor(e)}
            selectable="ignoreEvents"
            ignoreEvents
            defaultDate={handleShowMonday()}
            // eventPropGetter={event => handleEventStyle(event)}
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
