import React, { useState } from 'react';
import moment from 'moment';
import { RRule, RRuleSet, rrulestr } from 'rrule';

// const TestForm = () => {
//   const [formState, setFormState] = useState({
//     openingTime: moment().set({ hour: 6, minute: 0 }).toDate(),
//     closingTime: moment().set({ hour: 18, minute: 0 }).toDate(),
//     lunchBreakStart: moment().set({ hour: 12, minute: 0 }).toDate(),
//     lunchBreakEnd: moment().set({ hour: 13, minute: 0 }).toDate(),
//     unavailableDateTimes: {
//       startDateTime: moment().toDate(),
//       endDateTime: moment().toDate(),
//     },
//     duration: 1,
//     unit: 'days',
//     allDay: false,
//     everyWeek: false,
//     daily: false,
//     rrule: '',
//   });

//   const ruleSet = new RRuleSet();

//   ruleSet.rrule(
//     new RRule({
//       freq: RRule.WEEKLY, // if weekly is true
//       interval: 1, // do not skip any week
//       // byweekday: [RRule.MO, RRule.FR], // on which day of the week
//       dtstart: moment().set({ hour: 6, minute: 0 }).toDate(), // date start
//       until: moment().add(50, 'days').set({ hour: 8, minute: 0 }).toDate(), // date ends
//     })
//   );

//   const ruleString = ruleSet.toString();
//   const ruleArrayDates = RRule.fromString(ruleString).all();

//   const ruleArrayObjects = ruleArrayDates.map(date => {
//     return {
//       startTime: date,
//       endTime: moment(date).add(formState.duration, formState.unit).toDate(),
//     };
//   });

//   //weeks
//   //hours
//   //days
//   console.log('Testform1', ruleArrayObjects);

//   // console.log(ruleString);

//   const rruleSet = new RRuleSet();

//   rruleSet.rrule(
//     new RRule({
//       freq: RRule.WEEKLY, // if weekly is true
//       interval: 1, // do not skip any week
//       byweekday: [RRule.MO, RRule.FR], // on which day of the week
//       dtstart: moment().set({ hour: 6, minute: 0 }).toDate(), // date start
//       until: moment().set({ hour: 8, minute: 0 }).toDate(), // date ends
//     })
//   );

//   // console.log(rruleSet);

//   //   All Day && Weekly
//   // All Day cannot && Daily
//   // Daily cannot && Weekly

//   const setEveryWeek = () => {
//     // return a rrule string based on the startDate the endDatetime and the EveryWeek boolean
//   };

//   const aggregateUnavailability = () => {};

//   return (
//     <div>
//       <h1>hello</h1>
//     </div>
//   );
// };

const TestForm = () => {
  console.log('TestForm2 starts');
  const [formState, setFormState] = useState({
    endTime: moment([2020, 8, 27]).set({ hour: 17, minute: 0 }).toDate(),
    startTimeDate: moment([2020, 8, 27]).set({ hour: 9, minute: 0 }).toDate(),
    endDate: moment([2020, 13, 30]).set({ hour: 23, minute: 0 }).toDate(),
    frequency: 'WEEKLY', // yearly, monthly, weekly, daily, hourly
    // count: 30, // number
    interval: 1, // number
    byweekday: ['MO', 'TUE', 'WE', 'TH', 'FR'], //MO/TU/WE/THU/FR/SA/SU
  });

  const lunchBreak = {
    startTime: moment([2020, 8, 27]).set({ hour: 12, minute: 0 }).toDate(),
    endTime: moment([2020, 8, 27]).set({ hour: 14, minute: 0 }).toDate(),
    startDate: moment([2020, 8, 27]).toDate(),
    endDate: moment([2020, 13, 30]).toDate(),
    frequency: 'WEEKLY', // yearly, monthly, weekly, daily, hourly
    // count: 30, // number
    interval: 1, // number
    byweekday: ['MO', 'TUE', 'WE', 'TH', 'FR'], //MO/TU/WE/THU/FR/SA/SU
  };

  const weekDayGen = weekArray => {
    const newWeekArray = weekArray.map(day => {
      return RRule([day]);
    });
  };

  // console.log(() => weekDayGen(formState.byweekday)) [Function (anonymous)]

  // byweekday: [RRule.MO, RRule.FR],

  const doctorSchedules = new RRuleSet();

  const newRRulSet = ruleBluePrint =>
    new RRule({
      freq: RRule[ruleBluePrint.frequency],
      dtstart: ruleBluePrint.startTimeDate,
      until: ruleBluePrint.endDate,
      // count: ruleBluePrint.count, // not required
      interval: ruleBluePrint.interval,
      byweekday: weekDayGen(ruleBluePrint.byweekday),
    });
};
// Add working hours rule
doctorSchedules.rrule(() => newRRulSet(formState));

// Exclude mah tea time
doctorSchedules.exrule(() => newRRulSet(lunchBreak));
