const seedFreeSessions = (doctors) => {
  const setHour = (momentObj, hour) => {
    return momentObj
      .set({ hour, minute: 0, second: 0, millisecond: 0 })
      .valueOf();
  };

  const startDate = moment().add(1, 'days');
  const endDate = moment().add(3, 'months');
  const numDays = startDate.diff(endDate, 'days');

  const range = {
    morning: [8, 12],
    afternoon: [14, 18],
  };

  const freeSessionGen = async (
    startSession,
    endSession,
    doctor,
    duration = 30,
    restMin = 5
  ) => {
    const sessions = [];

    let startTime = startSession;
    let endTime = 0;

    // While endTime is before endSession
    while (endTime.isBefore(endSession)) {
      endTime = moment(startTime).add(duration, 'minutes');

      const session = {
        startTime: moment(startTime).valueOf(),
        endTime: moment(endTime).valueOf(),
        doctor: doctor._id,
      };

      sessions.push(session);

      // Free time bewteen sessions: 5 mins
      startTime = endTime.add(restMin, 'minutes');
    }

    return sessions;
  };

  doctors.forEach((doctor) => {
    // const sessionBluePrint = (rangeP) => {
    //   return {
    //     startTime: rangeP[0],
    //     endTime: rangeP[1],
    //     doctor: doctor._id,
    //   };
    // };

    console.log(doctor._id);

    for (let day; day < numDays; day += 1) {
      // Skip if Sunday
      if (day.day() === 7) {
        continue;
      }

      // Create morning Sessions
      const morningSessions = {
        startTime: setHour(day, range.morning[0]),
        endTime: setHour(day, range.morning[1]),
        doctor: doctor._id,
      };

      // Create afternoon Sessions
      const afternoonSessions = {
        startTime: setHour(day, range.afternoon[0]),
        endTime: setHour(day, range.afternoon[1]),
        doctor: doctor._id,
      };

      // const morningSessions = sessionBluePrint(range.morning)
      // const afternoonSessions = sessionBluePrint(range.afternoon)

      [morningSessions, afternoonSessions].forEach((period) => {
        const freeSessions = freeSessionGen(
          period.startTime,
          period.endTime,
          doctor
        );
        sessionDocs[0].documents.push(freeSessions);
        console.log(freeSessions);
      });
    }
  });
};
