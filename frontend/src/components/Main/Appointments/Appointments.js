import React, { useContext, useState, useEffect } from 'react';
import MainCalendar from './MainCalendar/MainCalendar';
import { RRule } from 'rrule';
import { v4 } from 'uuid';
import moment from 'moment';
import _, { difference } from 'lodash';
import omitDeep from 'omit-deep-lodash';
import { AuthContext } from '../../../globalState/index';
import { DoctorListContext } from '../../../globalState/index';
import { request } from '../../AxiosTest/config';
import { updateProfile } from '../../AxiosTest/userRoutes';
import {
  round,
  workingDays,
  sanitizeDoctorSessions,
  convertAPIdataToJS,
  convertUTC,
} from './helpers';
import CalendarForm from './CalendarForm/CalendarForm';
import './Appointments.scss';

const Appointments = () => {
  // Setting States
  const { user, setUser } = useContext(AuthContext);
  const { doctorList } = useContext(DoctorListContext);
  const [unavailabilities, setUnavailabilities] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [clientFormState, setClientFormState] = useState({
    doctor: '',
    startTime: round(moment(), moment.duration(15, 'minutes'), 'ceil').toDate(),
    endTime: '',
    sessionDuration: '',
    errors: [],
  });
  const [doctorAvailability, setDoctorAvailability] = useState({
    openingTime: moment().set({ hour: 5, minutes: 0 }).toDate(),
    closingTime: moment().set({ hour: 23, minutes: 0 }).toDate(),
    lunchBreakStart: moment().set({ hour: 11, minutes: 0 }).toDate(),
    lunchBreakEnd: moment().set({ hour: 16, minutes: 0 }).toDate(),
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
        modifier: RRule.WEEKLY,
      },
    ],
    errors: [],
  });

  // 1. Set selected doctor in state when user chooses
  // 2. Grab that doctors lunch break and unavailability
  // 3. Create new RRule from unavailability
  // 4.

  // Actions

  useEffect(() => {
    if (!_.isEmpty(selectedDoctor)) {
      const selectedDoctorUnavailabilites =
        selectedDoctor.doctorInfo.workSchedule;

      delete selectedDoctorUnavailabilites.openingTime;
      delete selectedDoctorUnavailabilites.closingTime;
      delete selectedDoctorUnavailabilites.unavailableDateTimes;

      console.log(selectedDoctorUnavailabilites);

      const lunchBreakDifference = moment(
        selectedDoctorUnavailabilites.lunchBreakEnd
      ).diff(moment(selectedDoctorUnavailabilites.lunchBreakStart), 'minutes');

      // console.log(lunchBreakDifference);

      const lunchBreakRRule = convertLunchBreakToCalendarEvents(
        selectedDoctorUnavailabilites
      );
      // console.log(lunchBreakRRule);

      const events = convertLunchBreakRruleToCalendarDates(
        lunchBreakRRule,
        lunchBreakDifference
      );

      setUnavailabilities(events);
      console.log(events);

      // const sanitizedDataObj = convertWorkScheduleToCalendarEvents(
      //   selectedDoctorUnavailabilites
      // );
      // console.log(sanitizedDataObj);

      // // Form has already been filled
      // setUnavailabilities(sanitizedDataObj); // Displaying data to calendar
    }
  }, [selectedDoctor]);

  const convertLunchBreakToCalendarEvents = lunchBreak => {
    const lunchBreakRRule = new RRule({
      freq: RRule.DAILY,
      dtstart: convertUTC(lunchBreak.lunchBreakStart),
      until: convertUTC(
        moment(lunchBreak.lunchBreakEnd).add(1, 'year').toDate()
      ),
      interval: 1,
    });

    return lunchBreakRRule;
  };

  const convertLunchBreakRruleToCalendarDates = (
    lunchBreakRRule,
    difference
  ) => {
    const ruleAll = lunchBreakRRule.all();

    return ruleAll.map(startTime => {
      const start = moment(startTime).toDate();
      const end = moment(start).add({ minutes: difference }).toDate();

      return {
        id: v4(),
        title: 'Lunch Break',
        start: start,
        end: end,
        same: moment(start).isSame(moment(end)),
      };
    });
  };

  // const convertWorkScheduleToCalendarEvents = () => {};

  const handleDoctorAvailabilitySubmit = async () => {
    //validations - no empty or dodgy fields

    checkEmptyDateFields('unavailableDateTimes');
    checkValidSubDateFields('unavailableDateTimes');

    if (
      !moment(doctorAvailability.openingTime).isValid() ||
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

    // console.log('here');

    // check that end date & times must be greater than start date & times
    if (
      moment(doctorAvailability.closingTime).isSameOrBefore(
        doctorAvailability.openingTime
      )
    ) {
      setDoctorAvailability({
        ...doctorAvailability,
        errors: ['Please select a valid closing time'],
      });
    }

    if (
      moment(doctorAvailability.openingTime).isSameOrAfter(
        doctorAvailability.closingTime
      )
    ) {
      setDoctorAvailability({
        ...doctorAvailability,
        errors: ['Please select a valid opening time'],
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

    const unavailabilityObj = {
      doctorInfo: {
        workSchedule: doctorAvailability, // Need to pass params in
      },
    };

    delete unavailabilityObj.doctorInfo.workSchedule.errors;

    // console.log(unavailabilityObj);

    try {
      const response = await updateProfile(unavailabilityObj);
      console.log(response);
      const sanitizedData = omitDeep(response.data, [
        '_id',
        '__v',
        'createdAt',
      ]);
      setUser(sanitizedData);
    } catch (err) {
      console.log(err);
      setUser({
        ...user,
        errors: [`Something went wrong, ${err}`],
      });
    }
  };

  const handleSelect = (e, key) => {
    const id = e.target.selectedOptions[0].id;
    const doctor = doctorList.find(el => el._id === id);
    setClientFormState({
      ...clientFormState,
      // [key]: e.target.selectedOptions[0].id,
      [key]: `Dr. ${doctor.firstName} ${doctor.lastName}`,
    });

    setSelectedDoctor(doctor);
  };

  const handleSubmit = async () => {
    try {
      const sessionToBook = {
        startTime: moment(clientFormState.startTime).format('YYYY-MM-DD hh:mm'),
        endTime: moment(clientFormState.endTime).format('YYYY-MM-DD hh:mm'),
      };

      console.log(sessionToBook);

      const response = await request.post(
        `users/${clientFormState.doctor}/book`,
        sessionToBook
      );
      console.log(response);
    } catch (error) {
      setClientFormState({
        ...clientFormState,
        errors: [`something went wrong ${error}`],
      });
    }
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

  const renderDoctorAppointments = () => {
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
            doctorList={doctorList}
          />
        </section>
        <MainCalendar
          user={user}
          doctorAvailability={doctorAvailability}
          unavailabilities={unavailabilities}
          doctorList={doctorList}
        />
      </div>
    );
  };

  const renderClientAppointments = () => {
    return (
      <div className="appointments-wrapper">
        <section className="calendar-form-wrapper">
          <CalendarForm
            clientFormState={clientFormState}
            setClientFormState={setClientFormState}
            handleSelect={handleSelect}
            handleSessionDuration={handleSessionDuration}
            user={user}
            doctorList={doctorList}
            selectedDoctor={selectedDoctor}
            handleSubmit={handleSubmit}
          />
        </section>
        <MainCalendar
          user={user}
          clientFormState={clientFormState}
          unavailabilities={unavailabilities}
          doctorList={doctorList}
          selectedDoctor={selectedDoctor}
        />
      </div>
    );
  };

  const showAppointmentView = () => {
    return user.isDoctor
      ? renderDoctorAppointments()
      : renderClientAppointments();
  };

  return showAppointmentView();
};

export default Appointments;
