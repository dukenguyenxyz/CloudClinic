const allDayUnavailability = doctorAvailability.unavailableDateTimes.map(
  unavailability => {
    if (unavailability.modifier === 'allDay') {
      const startClone = moment
        .utc(unavailability.startDateTime)
        .set(0, 'hour')
        .toDate();

      console.log(startClone, 'start clone');
      const endClone = moment
        .utc(unavailability.endDateTime)
        .set(24, 'hour')
        .toDate();

      console.log(endClone, 'end clone');

      return {
        startDate: startClone,
        endDate: endClone,
      };
    }
  }
);
