import React, { useContext, useState, useEffect } from 'react';
import MainCalendar from './MainCalendar/MainCalendar';
import './Appointments.scss';
import CalendarForm from './CalendarForm/CalendarForm';
import { AuthContext } from '../../../globalState/index';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import { RRule, RRuleSet, rrulestr } from 'rrule';
import { v4 as uuidv4 } from 'uuid';
import { viewSessions } from '../../AxiosTest/sessionRoutes';
import { convertAPIdataToJS } from './MainCalendar/events';

const Appointments = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [doctorSessions, setDoctorSessions] = useState([]);
  const [unavailabilities, setUnavailabilities] = useState([]);

  function round(date, duration, method) {
    return moment(Math[method](+date / +duration) * +duration);
  }

  const [clientFormState, setClientFormState] = useState({
    doctor: '',
    client: user.firstName,
    startTime: round(moment(), moment.duration(15, 'minutes'), 'ceil').toDate(),
    endTime: '',
    sessionDuration: '',
  });

  const [doctorAvailability, setDoctorAvailability] = useState({
    openningTime: moment().set({ hour: 6, minute: 0 }).toDate(),
    closingTime: moment().set({ hour: 18, minute: 0 }).toDate(),
    lunchBreakStart: moment().set({ hour: 12, minute: 0 }).toDate(),
    lunchBreakEnd: moment().set({ hour: 13, minute: 0 }).toDate(),
    unavailableDateTimes: [
      {
        startDateTime: round(
          moment(),
          moment.duration(15, 'minutes'),
          'ceil'
        ).toDate(),
        endDateTime: round(
          moment(),
          moment.duration(15, 'minutes'),
          'ceil'
        ).toDate(),
        modifier: '',
      },
    ],
    errors: [],
  });

  useEffect(() => {
    const sanitizedSessions = sanitizeDoctorSessions();
    // console.log(sanitizedSessions);
    setUnavailabilities(sanitizedSessions);
  }, [doctorAvailability]);

  const handleSelect = (e, key) => {
    setClientFormState({
      ...clientFormState,
      [key]: e.target.value,
    });
  };

  const handleAddClick = (key, formFieldsObject) => {
    setDoctorAvailability({
      ...doctorAvailability,
      [key]: [...doctorAvailability[key], formFieldsObject],
    });
  };

  const handleRemoveClick = (key, i) => {
    //spread value at the formState key into list
    const list = [...doctorAvailability[key]];

    //at index i, remove one item
    list.splice(i, 1);
    setDoctorAvailability({
      ...doctorAvailability,
      [key]: list,
    });
  };

  const handleSessionDuration = (e, duration) => {
    if (e.target.value === duration) {
      const endTime = moment(clientFormState.startTime)
        .add(duration, 'minutes')
        .toDate();

      setClientFormState({
        ...clientFormState,
        sessionDuration: duration,
        endTime,
      });
    }
  };

  const handleUnavailableDateChange = (el, i, key, date, timeBlock) => {
    setDoctorAvailability({
      ...doctorAvailability,
      errors: [],
      [key]: doctorAvailability[key].map((element, index) => {
        if (index === i) {
          element[timeBlock] = date;
        }
        return element;
      }),
    });
  };

  const handleUnavailabilityModifiers = (e, i, key) => {
    setDoctorAvailability({
      ...doctorAvailability,
      errors: [],
      [key]: doctorAvailability[key].map((element, index) => {
        if (index === i) {
          element['modifier'] = e.target.value;
        }
        return element;
      }),
    });
  };

  const checkEmptyDateFields = key => {
    doctorAvailability[key].forEach(el => {
      const inputValues = Object.values(el);
      for (let i = 0; i < inputValues.length; i++) {
        if (
          typeof inputValues[i] !== 'string' &&
          !moment(inputValues[i]).isValid()
        ) {
          setDoctorAvailability({
            ...doctorAvailability,
            errors: [
              'Please fill in all fields and only include valid dates and times',
            ],
          });
        }
      }
    });
  };

  const checkValidSubDateFields = key => {
    doctorAvailability[key].forEach(el => {
      const clone = (({ modifier, ...o }) => o)(el);

      // clone.startDateTime
      // clone.endDateTime
      if (moment(clone.endDateTime).isSameOrBefore(clone.startDateTime)) {
        setDoctorAvailability({
          ...doctorAvailability,
          errors: [
            'Please select a valid end date time for your unavailability',
          ],
        });
      }

      if (moment(clone.startDateTime).isSameOrAfter(clone.endDateTime)) {
        setDoctorAvailability({
          ...doctorAvailability,
          errors: [
            'Please select a valid start date time for your unavailability',
          ],
        });
      }
    });
  };

  /// OLD
  const aggregateUnavailability = () => {
    // // RRULES
    // // doctorAvailability.openningTime
    // // doctorAvailability.closingTime
    // // doctorAvailability.lunchBreakStart
    // // doctorAvailability.lunchBreakEnd
    // // const allDayUnavailability = doctorAvailability.unavailableDateTimes.map(
    // //   unavailability => {
    // //     if (unavailability.modifier === 'allDay') {
    // //       return {
    // //         startDate: moment(unavailability.startDateTime)
    // //           .startOf('day')
    // //           .toDate(),
    // //         endDate: moment(unavailability.startDateTime).endOf('day').toDate(),
    // //       };
    // //     }
    // //   }
    // // );
    // const allDayUnavailability = doctorAvailability.unavailableDateTimes.map(
    //   unavailability => {
    //     if (unavailability.modifier === 'allDay') {
    //       return {
    //         startDate: moment(unavailability.startDateTime)
    //           .startOf('day')
    //           .toDate(),
    //         endDate: moment(unavailability.startDateTime).endOf('day').toDate(),
    //       };
    //     }
    //   }
    // );
    // const convertUTC = date => {
    //   return moment.utc(date).toDate(); // '2020-07-01 09:00'
    // };
    // const newRRulSet = ruleBluePrint => {
    //   const newRRule = new RRule({
    //     dtstart: convertUTC(ruleBluePrint.startDateTime), // new Date(Date.UTC(2012, 1, 1, 10, 30)) (CONVERT THIS TO UTC)
    //     until: convertUTC(moment(ruleBluePrint.startDateTime).add(6, 'months')), // new Date(Date.UTC(2012, 1, 1, 10, 30))
    //   });
    //   if (ruleBluePrint.modifier) {
    //     newRRule.freq = parseInt(ruleBluePrint.modifier, 10); // RRule.MONTHLY, (NUMERIC VALUE)
    //   }
    //   return newRRule;
    // };
    // const unavailabilities = doctorAvailability.unavailableDateTimes.map(
    //   unavailability => {
    //     return {
    //       include: false,
    //       ruleInstruction: newRRulSet(unavailability).toString(),
    //       endDateTime: convertUTC(unavailability.endDateTime),
    //     };
    //   }
    // );
    // return unavailabilities;
  };

  const sanitizeDoctorSessions = () => {
    const convertUTC = date => {
      return moment.utc(date).toDate(); // '2020-07-01 09:00'
    };

    const newRRulSet = bluePrint => {
      const newRRule = new RRule({
        dtstart: convertUTC(bluePrint.startDateTime), // new Date(Date.UTC(2012, 1, 1, 10, 30)) (CONVERT THIS TO UTC)
        until: convertUTC(moment(bluePrint.startDateTime).add(6, 'months')), // new Date(Date.UTC(2012, 1, 1, 10, 30))
      });

      if (bluePrint.modifier) {
        newRRule.freq = parseInt(bluePrint.modifier, 10); // RRule.MONTHLY, (NUMERIC VALUE)
      }

      return newRRule;
    };

    // Sanitize the available hours
    const morningHours = {
      startDateTime: doctorAvailability.openningTime,
      endDateTime: doctorAvailability.lunchBreakStart,
      modifier: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
    };

    const afternoonHours = {
      startDateTime: doctorAvailability.lunchBreakEnd,
      endDateTime: doctorAvailability.closingTime,
      modifier: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
    };

    const workingHours = [morningHours, afternoonHours];

    //Available Times
    const workingHoursSchedules = workingHours.map(period => {
      return {
        duration: moment(period.endDateTime).diff(
          period.startDateTime,
          'minutes'
        ),
        include: true,
        ruleInstruction: newRRulSet(period).toString(),
      };
    });
    // Sanitize the unavailable hours

    // 6AM ... < 6AM is unavailable
    // 7PM ... > 7PM is unavailabile

    // docotr.avaiaiblity.unavaialbledatetimes =     unavailableDateTimes: [
    //   {
    //     startDateTime: round(
    //       moment(),
    //       moment.duration(15, 'minutes'),
    //       'ceil'
    //     ).toDate(),
    //     endDateTime: round(
    //       moment(),
    //       moment.duration(15, 'minutes'),
    //       'ceil'
    //     ).toDate(),
    //     modifier: '',
    //   },
    // ],

    // const sampleArr = [
    //   {
    //     duration: 15, // integer, enum [15, 30, 60]
    //     include: false,
    //     ruleInstruction: ruleStringified1,
    //   },
    //   {
    //     duration: 30,
    //     include: false,
    //     ruleInstruction: ruleStringified2,
    //   },
    // ];

    const unavailabilities = doctorAvailability.unavailableDateTimes.map(
      unavailability => {
        return {
          duration: moment(unavailability.endDateTime).diff(
            unavailability.startDateTime,
            'minutes'
          ),
          include: false,
          ruleInstruction: newRRulSet(unavailability).toString(),
        };
      }
    );
    console.log(unavailabilities);

    const result = convertAPIdataToJS(unavailabilities);
    console.log(result);
    return result;

    // console.log(_.flattenDeep([unavailabilities]));

    // setUnavailabilities(_.flattenDeep([unavailabilities]));
    // return _.flattenDeep([unavailabilities]);
  };

  // Make API Call
  const handleDoctorAvailabilitySubmit = () => {
    //validations - no empty or dodgy fields

    checkEmptyDateFields('unavailableDateTimes');
    checkValidSubDateFields('unavailableDateTimes');

    if (
      !moment(doctorAvailability.openningTime).isValid() ||
      !moment(doctorAvailability.closingTime).isValid() ||
      !moment(doctorAvailability.lunchBreakStart).isValid() ||
      !moment(doctorAvailability.lunchBreakEnd).isValid()
    ) {
      setDoctorAvailability({
        ...doctorAvailability,
        errors: [
          'Please fill in all fields and only include valid dates and times',
        ],
      });
    }

    // check that end date & times must be greater than start date & times
    if (
      moment(doctorAvailability.closingTime).isSameOrBefore(
        doctorAvailability.openningTime
      )
    ) {
      setDoctorAvailability({
        ...doctorAvailability,
        errors: ['Please select a valid closing time'],
      });
    }

    if (
      moment(doctorAvailability.openningTime).isSameOrAfter(
        doctorAvailability.closingTime
      )
    ) {
      setDoctorAvailability({
        ...doctorAvailability,
        errors: ['Please select a valid openning time'],
      });
    }

    if (
      moment(doctorAvailability.lunchBreakStart).isSameOrAfter(
        doctorAvailability.lunchBreakEnd
      )
    ) {
      setDoctorAvailability({
        ...doctorAvailability,
        errors: ['Please select a valid lunch break start time'],
      });
    }

    if (
      moment(doctorAvailability.lunchBreakEnd).isSameOrBefore(
        doctorAvailability.lunchBreakStart
      )
    ) {
      setDoctorAvailability({
        ...doctorAvailability,
        errors: ['Please select a valid lunch break end time'],
      });
    }
    // console.log('no errors');

    // const unavailabilities = aggregateUnavailability();

    // console.log(unavailabilities);
  };

  const doctorAppointments = () => {
    return (
      <div className="appointments-wrapper">
        <section className="calendar-form-wrapper">
          <CalendarForm
            doctorAvailability={doctorAvailability}
            setDoctorAvailability={setDoctorAvailability}
            user={user}
            handleAddClick={handleAddClick}
            handleRemoveClick={handleRemoveClick}
            handleUnavailableDateChange={handleUnavailableDateChange}
            handleUnavailabilityModifiers={handleUnavailabilityModifiers}
            round={round}
            handleDoctorAvailabilitySubmit={handleDoctorAvailabilitySubmit}
          />
        </section>
        <MainCalendar
          doctorAvailability={doctorAvailability}
          unavailabilities={unavailabilities}
        />
      </div>
    );
  };

  const clientAppointments = () => {
    return (
      <div className="appointments-wrapper">
        <section className="calendar-form-wrapper">
          <CalendarForm
            clientFormState={clientFormState}
            setClientFormState={setClientFormState}
            handleSelect={handleSelect}
            handleSessionDuration={handleSessionDuration}
            user={user}
          />
        </section>
        <MainCalendar clientFormState={clientFormState} />
      </div>
    );
  };

  const showAppointmentView = () => {
    return user.isDoctor ? doctorAppointments() : clientAppointments();
  };

  return showAppointmentView();
};

export default Appointments;
