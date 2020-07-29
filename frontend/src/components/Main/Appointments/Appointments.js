import React, { useContext, useState, useEffect } from 'react';
import MainCalendar from './MainCalendar/MainCalendar';
import './Appointments.scss';
import CalendarForm from './CalendarForm/CalendarForm';
import { AuthContext } from '../../../globalState/index';
import moment from 'moment';
import _ from 'lodash';
import { RRule, RRuleSet, rrulestr } from 'rrule';
import { v4 as uuidv4 } from 'uuid';
import { viewSessions } from '../../AxiosTest/sessionRoutes';
import { updateProfile } from '../../AxiosTest/userRoutes';
import { convertAPIdataToJS } from './MainCalendar/events';
import omitDeep from 'omit-deep-lodash';

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
    openningTime: null,
    closingTime: null,
    lunchBreakStart: null,
    lunchBreakEnd: null,
    unavailableDateTimes: [
      {
        startDateTime: null,
        endDateTime: null,
        modifier: RRule.WEEKLY,
      },
    ],
    errors: [],
  });

  useEffect(() => {
    if (
      doctorAvailability.openningTime &&
      doctorAvailability.closingTime &&
      doctorAvailability.lunchBreakStart &&
      doctorAvailability.lunchBreakEnd &&
      doctorAvailability.unavailableDateTimes[0] &&
      doctorAvailability.unavailableDateTimes[0].startDateTime &&
      doctorAvailability.unavailableDateTimes[0].endDateTime
    ) {
      const sanitizedUnavailabilities = sanitizeDoctorSessions();
      const sanitizedDataObj = _.flattenDeep(
        Object.values(sanitizedUnavailabilities).map(unavailability => {
          return convertAPIdataToJS(unavailability);
        })
      );

      setUnavailabilities(sanitizedDataObj);
    }
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

  const sanitizeDoctorSessions = () => {
    const convertUTC = date => {
      return moment.utc(date).toDate(); // '2020-07-01 09:00'
    };

    const newRRulSet = bluePrint => {
      const newRRule = {
        dtstart: convertUTC(bluePrint.startDateTime), // new Date(Date.UTC(2012, 1, 1, 10, 30)) (CONVERT THIS TO UTC)
        until: convertUTC(moment(bluePrint.startDateTime).add(12, 'months')), // new Date(Date.UTC(2012, 1, 1, 10, 30))
        interval: 1,
      };

      if (bluePrint.modifier) {
        newRRule.freq = bluePrint.modifier;
      }

      if (bluePrint.byweekday) {
        newRRule.byweekday = bluePrint.byweekday;
      }

      const newRRuleGenerated = new RRule(newRRule);

      return newRRuleGenerated;
    };

    const unavailableMorning = {
      startDateTime: moment
        .utc(doctorAvailability.openningTime)
        .startOf('day')
        .toDate(),
      endDatetime: moment.utc(doctorAvailability.openningTime),
      byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
      modifier: RRule.WEEKLY,
    };

    const unavailableLunch = {
      startDateTime: moment.utc(doctorAvailability.lunchBreakStart),
      endDateTime: moment.utc(doctorAvailability.lunchBreakEnd),
      byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
      modifier: RRule.WEEKLY,
    };

    const unavailableAfternoon = {
      startDateTime: doctorAvailability.closingTime,
      endDatetime: moment
        .utc(doctorAvailability.closingTime)
        .endOf('day')
        .toDate(),
      byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
      modifier: RRule.WEEKLY,
    };

    const unavailableWeekends = {
      startDateTime: moment().day(6).startOf('day').toDate(),
      endDateTime: moment().day(7).endOf('day').toDate(),
      byweekday: [RRule.SA],
      modifier: RRule.WEEKLY,
    };

    const standardUnavailabilities = [
      unavailableMorning,
      unavailableLunch,
      unavailableAfternoon,
      unavailableWeekends,
    ];

    //Available Times
    const normalSchedule = standardUnavailabilities.map(period => {
      return {
        duration: moment(period.endDateTime).diff(
          period.startDateTime,
          'minutes'
        ),
        include: false,
        ruleInstruction: newRRulSet(period).toString(),
        ruleInstructionText: newRRulSet(period).toText(),
      };
    });
    // Sanitize the unavailable hours

    // 6AM ... < 6AM is unavailable
    // 7PM ... > 7PM is unavailabile

    const unavailabilities = doctorAvailability.unavailableDateTimes.map(
      unavailability => {
        return {
          duration: moment(unavailability.endDateTime).diff(
            unavailability.startDateTime,
            'minutes'
          ), //integer
          include: false,
          ruleInstruction: newRRulSet(unavailability).toString(),
          ruleInstructionText: newRRulSet(unavailability).toText(),
        };
      }
    );

    /* needs to return and object 
    {
      workingHours: [Array],
      unavailabilities: [Array]
    }
    */
    return {
      normalSchedule,
      unavailabilities,
    };
  };

  // Make API Call
  const handleDoctorAvailabilitySubmit = async () => {
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

    // const unavailabilityObj = {
    //   doctorInfo: {
    //     schedule: {
    //       unavailabilities: sanitizeDoctorSessions(), //the array here
    //     },
    //   },
    // };

    const unavailabilityObj = {
      doctorInfo: {
        schedule: sanitizeDoctorSessions(),
      },
    };

    try {
      const response = await updateProfile(unavailabilityObj);
      console.log(response);
      const sanitizedData = omitDeep(response.data, [
        '_id',
        '__v',
        'createdAt',
      ]);
      setUser(sanitizedData);
      // navigate('/profile');
    } catch (err) {
      console.log(err);
      setUser({
        ...user,
        errors: ['network error'],
      });
    }
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
