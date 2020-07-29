// const moment = require('moment');
// const { RRule, RRuleSet, rrulestr } = require('rrule');

// const date = '2017-03-13';
// const time = '18:00';
// const timeAndDate = moment(`${date} ${time}`).toDate(); // make sure you leave a space between date and time

// console.log(timeAndDate);

// const formState = {
//   startTimeDate: moment([2020, 6, 28, 9, 0]).toDate(),
//   endTime: moment([2020, 6, 28, 17, 0]).toDate(),
//   endDate: moment([2020, 11, 30, 23, 0]).toDate(),
//   frequency: 'WEEKLY', // yearly, monthly, weekly, daily, hourly
//   // count: 30, // number
//   interval: 1, // number
//   byweekday: ['MO', 'TU', 'WE', 'TH', 'FR'], //MO/TU/WE/THU/FR/SA/SU
// };

// // const newMoment = moment([2010, 1, 14, 15, 25]).toDate(); // 2010 February 14th, 15:25
// // console.log(newMoment)

// const lunchBreak = {
//   startTimeDate: moment([2020, 6, 28, 12, 0]).toDate(),
//   endTime: moment([2020, 6, 28, 14, 0]).toDate(),
//   endDate: moment([2020, 11, 30]).toDate(),
//   frequency: 'WEEKLY', // yearly, monthly, weekly, daily, hourly
//   // count: 30, // number
//   interval: 1, // number
//   byweekday: ['MO', 'TU', 'WE', 'TH', 'FR'], //MO/TU/WE/THU/FR/SA/SU
// };

// const weekDayGen = weekArray => {
//   return weekArray.map(day => {
//     return RRule[day];
//   });
// };

// console.log(formState);
// console.log(lunchBreak);

// // console.log(() => weekDayGen(formState.byweekday)) [Function (anonymous)]

// const doctorSchedules = new RRuleSet();

// const newRRulSet = ruleBluePrint => {
//   return new RRule({
//     freq: RRule[ruleBluePrint.frequency], // RRule.MONTHLY, (NUMERIC VALUE)
//     dtstart: ruleBluePrint.startTimeDate, // new Date(Date.UTC(2012, 1, 1, 10, 30))
//     until: ruleBluePrint.endDate, // new Date(Date.UTC(2012, 1, 1, 10, 30))
//     // count: ruleBluePrint.count, // not required // integer
//     interval: ruleBluePrint.interval, // integer
//     byweekday: weekDayGen(ruleBluePrint.byweekday), // [RRule.MO, RRule.FR]
//   });
// };

// // console.log('RRuleFreq', RRule[formState.frequency]);

// // console.log('formstate', formState.endDate);

// // console.log('MONTHLY', RRule.MONTHLY);

// // console.log('YEARLY', RRule.YEARLY);

// // console.log([
// //   RRule.YEARLY,
// //   RRule.MONTHLY,
// //   RRule.WEEKLY,
// //   RRule.DAILY,
// //   RRule.HOURLY,
// //   RRule.MINUTELY,
// //   RRule.SECONDLY,
// // ]);

// // console.log([
// //   RRule.MO,
// //   RRule.TU,
// //   RRule.WE,
// //   RRule.TH,
// //   RRule.FR,
// //   RRule.SA,
// //   RRule.SU,
// // ]);

// // Add working hours rule
// doctorSchedules.rrule(newRRulSet(formState));

// // new RRule({})

// // console.log(newRRulSet(formState));

// // Exclude mah tea time
// doctorSchedules.exrule(newRRulSet(lunchBreak));
// // console.log(doctorSchedules);

// // console.log(newRRulSet(formState));

// console.log(doctorSchedules.all());

// rule.between(new Date(Date.UTC(2012, 7, 1)), new Date(Date.UTC(2012, 8, 1)));
// // // ['2012-08-27T10:30:00.000Z',
// // //  '2012-08-31T10:30:00.000Z']

// // rule.all(function (date, i){return i < 2})
// // // [ '2012-02-01T10:30:00.000Z',
// // //   '2012-05-01T10:30:00.000Z' ]

// // 1st way
// const weekdayRule = new RRule({
//   freq: RRule.WEEKLY,
//   dtstart: new Date(moment.utc('2020-07-01 09:00').toDate()), // Date.UTC(2020, 7, 1, 0, 0, 0)
//   until: new Date(moment.utc('2020-11-30 15:30').toDate()), // Date.UTC(2020, 11, 31, 14, 20, 0)
//   interval: 1,
//   byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
// });

// const weekdayIncl = {
//   include: true,
//   ruleInstruction: weekdayRule,
//   duration: { count: 8, unit: 'hours' },
// };

// // 2nd way
// const weekdayStartRule = new RRule({
//   freq: RRule.WEEKLY,
//   dtstart: new Date(moment.utc('2020-07-01 09:00').toDate()), // Date.UTC(2020, 7, 1, 0, 0, 0)
//   until: new Date(moment.utc('2020-11-30 15:30').toDate()), // Date.UTC(2020, 11, 31, 14, 20, 0)
//   interval: 1,
//   byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
// });
// 28/7/2020:9.30 [0]
// 29/7/2020:9.30 [1]
// 30/7/2020:9.30
// ..

// const weekdayEndRule = new RRule({
//   freq: RRule.WEEKLY,
//   dtstart: new Date(moment.utc('2020-07-01 17:00').toDate()), // Date.UTC(2020, 7, 1, 0, 0, 0)
//   until: new Date(moment.utc('2020-11-30 15:30').toDate()), // Date.UTC(2020, 11, 31, 14, 20, 0)
//   interval: 1,
//   byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
// });
// 28/7/2020:17.00 [0]
// 29/7/2020:17.00 [1]
// 30/7/2020:17.00
// ..

// const weekDayRuleSet = {
//   start: weekdayStartRule.all[1],
//   end: weekdayEndRule.all[1],
// };

// {
//   29/7/2020:9.30 [1],
//   29/7/2020:17.00 [1]
// }
