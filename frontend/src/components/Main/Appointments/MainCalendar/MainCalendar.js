// prettier-ignore

import React, { useState, useEffect, useContext} from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { MessageContext } from '../../../../globalState/index';

const localizer = momentLocalizer(moment);

const mapToRBCFormat = e => {
  const newDateObj = Object.assign({}, e, {
    start: moment(e.start)._d,
    end: moment(e.end)._d,
  });

  return newDateObj;
};

export const handleEventStyle = (event, user) => {
  // unavailable grey block
  const clientStyle = {
    backgroundColor: '#cccccc',
    color: '#cccccc',
  };

  const doctorStyle = {
    backgroundColor: '#aaaaaa',
  };

  if (event.status === 'unavailable' && !user.isDoctor) {
    return {
      className: '',
      style: clientStyle,
    };
  }

  if (event.title.toLowerCase() === 'unavailable' && user.isDoctor) {
    return {
      className: '',
      style: doctorStyle,
    };
  }
};

const MainCalendar = ({
  unavailabilities,
  user,
  selectedDoctor,
  setUnavailabilities,
  setClientFormState,
  clientFormState,
  setDoctorAvailability,
  doctorAvailability,
}) => {
  const { setFlashMessage } = useContext(MessageContext);
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
        setFlashMessage({
          message: `Appointments cannot overlap with your unavailability or an exisiting time slot`,
          type: 'error',
          icon: 'alert',
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
          });
          setFlashMessage(null);
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
          });

          setFlashMessage(null);
        }
      } else if (!name && moment(end).diff(start, 'minutes') <= 60) {
        setFlashMessage({
          message: `Please enter your name for the appointment`,
          type: 'error',
          icon: 'alert',
        });
        return null;
      } else {
        setFlashMessage({
          message: `Please only select an appoitnment time between 30 and 60 mins`,
          type: 'error',
          icon: 'alert',
        });
        return null;
      }
    }
  };

  const handleSelectDoctor = ({ start, end }) => {
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
        setFlashMessage({
          message: `Unavailabilities can\`t overlap`,
          type: 'error',
          icon: 'alert',
        });
        return null;
      }
    }

    if (moment(end).diff(start, 'minutes') > 0) {
      const unavailability = window.prompt('Please enter your unavailability');
      if (unavailability) {
        if (
          unavailabilities[unavailabilities.length - 1].unavailable !==
          'unavailable'
        ) {
          setUnavailabilities([
            ...unavailabilities,
            {
              start,
              end,
              title: unavailability,
            },
          ]);

          setDoctorAvailability({
            ...doctorAvailability,
            unavailableDateTimes: [
              ...doctorAvailability['unavailableDateTimes'],
              {
                startDateTime: start,
                endDateTime: end,
                modifier: 0,
                title: unavailability,
              },
            ],
          });

          setFlashMessage(null);
        } else {
          setUnavailabilities([
            ...unavailabilities,
            {
              start,
              end,
              title: unavailability,
            },
          ]);
        }
      } else if (!unavailability && moment(end).diff(start, 'minutes') <= 60) {
        setFlashMessage({
          message: `Please enter a title for your unavailability`,
          type: 'error',
          icon: 'alert',
        });
        return null;
      }
    }
  };

  const handleShowMonday = () => {
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
    if (event.title.toLowerCase() === 'unavailable') {
      setFlashMessage({
        message: `Unavailable`,
        type: 'error',
        icon: 'alert',
      });
      return null;
    }

    if (event.title.toLowerCase() === 'lunch break') {
      setFlashMessage({
        message: `Lunch Break`,
        type: 'notification',
        icon: 'notification',
      });
      return null;
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
              !_.isEmpty(selectedDoctor)
                ? handleSelectClient(e)
                : setFlashMessage({
                    message: `Please select a doctor first`,
                    type: 'error',
                    icon: 'alert',
                  })
            }
            selectable="ignoreEvents"
            ignoreEvents
            defaultDate={handleShowMonday()}
            eventPropGetter={event => handleEventStyle(event, user)}
            events={unavailabilities.map(mapToRBCFormat)}
            startAccessor="start"
            endAccessor="end"
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
            eventPropGetter={event => handleEventStyle(event, user)}
            events={unavailabilities.map(mapToRBCFormat)}
            startAccessor="start"
            endAccessor="end"
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
