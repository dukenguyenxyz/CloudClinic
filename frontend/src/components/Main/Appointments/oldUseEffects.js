useEffect(() => {
  // console.log(user);

  // Set the doctor unavails from fetching
  if (
    user.isDoctor &&
    user.doctorInfo.workSchedule
    // && user.doctorInfo.workSchedule.unavailableDateTimes > 0
  ) {
    // console.log('Use Effect 2');
    // Problem number 2 why schedule.unavailabilities ?

    // Getting the unavailabilities of the doctor
    const unavailsRules = user.doctorInfo.workSchedule; // Form Data

    // Conversion (no longer need openingTime losingTime for displaying for RRule, if anything happens ask Harry)
    // Get lunch break
    const lunchBreak = {
      startDateTime: unavailsRules.lunchBreakStart,
      endDateTime: unavailsRules.lunchBreakEnd,
      modifier: RRule.WEEKLY,
      byweekday: workingDays,
    };

    // Spread lunch break with unavails
    const convertedArray = [...unavailsRules.unavailableDateTimes, lunchBreak];

    // console.log(convertedArray);

    // Convert unavailsRules using sanitizeDoctorSessions
    const unavailsRealDatesData = sanitizeDoctorSessions(convertedArray); // Calendar Display Data

    // Set the unavailibities to the unavailsRealDatesData
    setUnavailabilities(unavailsRealDatesData); // Displaying the calendar with data

    // Prefilling the form
    setDoctorAvailability(unavailsRules);
  }
}, []);

useEffect(() => {
  if (
    doctorAvailability.openingTime &&
    doctorAvailability.closingTime &&
    doctorAvailability.lunchBreakStart &&
    doctorAvailability.lunchBreakEnd &&
    doctorAvailability.unavailableDateTimes[0] &&
    doctorAvailability.unavailableDateTimes[0].startDateTime &&
    doctorAvailability.unavailableDateTimes[0].endDateTime &&
    user.isDoctor
  ) {
    console.log('Use Effect 1');
    // Use piping here is also good

    const sanitizedDataObj = convertWorkScheduleToCalendarEvents(
      doctorAvailability
    );

    // Form has already been filled
    setUnavailabilities(sanitizedDataObj); // Displaying data to calendar
  }
}, [doctorAvailability]);

useEffect(() => {
  if (!_.isEmpty(selectedDoctor)) {
    // console.log('Use Effect 2');

    const selectedDoctorUnavailabilites =
      selectedDoctor.doctorInfo.workSchedule;

    console.log(selectedDoctorUnavailabilites);

    const sanitizedDataObj = convertWorkScheduleToCalendarEvents(
      selectedDoctorUnavailabilites
    );
    console.log(sanitizedDataObj);

    // Form has already been filled
    setUnavailabilities(sanitizedDataObj); // Displaying data to calendar
  }
}, [selectedDoctor]);

const normalScheduleAggregrates = availability => {
  // doctorAvailability = availability

  const unavailableSession = (startDateTime, endDateTime, byweekday) => {
    return {
      startDateTime: startDateTime.toDate(),
      endDatetime: endDateTime.toDate(),
      byweekday: byweekday,
      modifier: RRule.WEEKLY,
    };
  };

  const unavailableMorning = unavailableSession(
    moment.utc(availability.openingTime).startOf('day'),
    moment.utc(availability.openingTime),
    workingDays
  );

  const unavailableLunch = unavailableSession(
    moment.utc(availability.lunchBreakStart),
    moment.utc(availability.lunchBreakEnd),
    workingDays
  );

  const unavailableAfternoon = unavailableSession(
    moment.utc(availability.closingTime),
    moment.utc(availability.closingTime).endOf('day'),
    workingDays
  );

  const unavailableWeekends = unavailableSession(
    moment().day(6).startOf('day'),
    moment().day(7).endOf('day'),
    [RRule.SA]
  );

  const standardUnavailabilities = [
    unavailableMorning,
    unavailableLunch,
    unavailableAfternoon,
    unavailableWeekends,
  ];

  //Available Times
  return standardUnavailabilities;
};

const convertWorkScheduleToCalendarEvents = availability => {
  // doctorAvailability = availability
  const unavailsAggregate = _.flattenDeep(
    normalScheduleAggregrates(availability),
    availability.unavailableDateTimes
  );

  const sanitizedUnavailabilities = sanitizeDoctorSessions(unavailsAggregate);

  const sanitizedDataObjReturn = convertAPIdataToJS(sanitizedUnavailabilities);
  return sanitizedDataObjReturn;
};
