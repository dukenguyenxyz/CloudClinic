const moment = require('moment');
const { RRule, RRuleSet, rrulestr } = require('rrule');

const date = '2017-03-13';
const time = '18:00';
const timeAndDate = moment(`${date} ${time}`).toDate(); // make sure you leave a space between date and time

console.log(timeAndDate);

const formState = {
  startTimeDate: moment([2020, 6, 28, 9, 0]).toDate(),
  endTime: moment([2020, 6, 28, 17, 0]).toDate(),
  endDate: moment([2020, 11, 30, 23, 0]).toDate(),
  frequency: 'WEEKLY', // yearly, monthly, weekly, daily, hourly
  // count: 30, // number
  interval: 1, // number
  byweekday: ['MO', 'TU', 'WE', 'TH', 'FR'], //MO/TU/WE/THU/FR/SA/SU
};

// const newMoment = moment([2010, 1, 14, 15, 25]).toDate(); // 2010 February 14th, 15:25
// console.log(newMoment)

const lunchBreak = {
  startTimeDate: moment([2020, 6, 28, 12, 0]).toDate(),
  endTime: moment([2020, 6, 28, 14, 0]).toDate(),
  endDate: moment([2020, 11, 30]).toDate(),
  frequency: 'WEEKLY', // yearly, monthly, weekly, daily, hourly
  // count: 30, // number
  interval: 1, // number
  byweekday: ['MO', 'TU', 'WE', 'TH', 'FR'], //MO/TU/WE/THU/FR/SA/SU
};

const weekDayGen = weekArray => {
  return weekArray.map(day => {
    return RRule[day];
  });
};

console.log(formState);
console.log(lunchBreak);

// console.log(() => weekDayGen(formState.byweekday)) [Function (anonymous)]

const doctorSchedules = new RRuleSet();

const newRRulSet = ruleBluePrint => {
  return new RRule({
    freq: RRule[ruleBluePrint.frequency], // RRule.MONTHLY, (NUMERIC VALUE)
    dtstart: ruleBluePrint.startTimeDate, // new Date(Date.UTC(2012, 1, 1, 10, 30))
    until: ruleBluePrint.endDate, // new Date(Date.UTC(2012, 1, 1, 10, 30))
    // count: ruleBluePrint.count, // not required // integer
    interval: ruleBluePrint.interval, // integer
    byweekday: weekDayGen(ruleBluePrint.byweekday), // [RRule.MO, RRule.FR]
  });
};

// console.log('RRuleFreq', RRule[formState.frequency]);

// console.log('formstate', formState.endDate);

// console.log('MONTHLY', RRule.MONTHLY);

// console.log('YEARLY', RRule.YEARLY);

// console.log([
//   RRule.YEARLY,
//   RRule.MONTHLY,
//   RRule.WEEKLY,
//   RRule.DAILY,
//   RRule.HOURLY,
//   RRule.MINUTELY,
//   RRule.SECONDLY,
// ]);

// console.log([
//   RRule.MO,
//   RRule.TU,
//   RRule.WE,
//   RRule.TH,
//   RRule.FR,
//   RRule.SA,
//   RRule.SU,
// ]);

// Add working hours rule
doctorSchedules.rrule(newRRulSet(formState));

// new RRule({})

// console.log(newRRulSet(formState));

// Exclude mah tea time
doctorSchedules.exrule(newRRulSet(lunchBreak));
// console.log(doctorSchedules);

// console.log(newRRulSet(formState));

console.log(doctorSchedules.all());
