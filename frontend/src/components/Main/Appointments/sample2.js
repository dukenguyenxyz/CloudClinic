const moment = require('moment');
const { RRule, RRuleSet, rrulestr } = require('rrule');

// USER STORY: CLIENT

/* 
- Action: Doctor makes the available sesions and unavailable sessions
Object looks like this {RRULE, duration}
- For all unavailable sessions into 3 months time, the time is the start time + the whole duration property

- Action: Client clicks on the doctor 
  - GET: Doctor (incl: doctor's avail/unavailable sessions)
  - JS: All unavailable times are greyed out
- Action: Client clicks on the date they are available, then clicks on the time, clicks on the duration of the booking, clicks book
  - POST: Sesssion
  - JS: A JS Object {startTime, endTime (calculated from duration)} is sent to the API
  - Express: (Check if that time is available)
    The Doctor's unavailable sessions in RRULE form are fetched
    for each rule apply rule.between() to check
      if (rule.between(startTime, endTime)){
      return false}
      Else if () (previous startTime has a duration that is too long){
        return false
      }


    If yes, return the date time, and add in the duration, if the start time, and the end time collides with the client's then decline

    If available confirm request
    If unavailable throw an error

- Action: Doctor opens the calendar, receives the pending booking (GET all session where the doctor_id is the current doctor)
- If the doctor declines, the confirm status switches to decline, and the booking is notified to be unavailable
- If the doctor accepts, the confirm status switches to yes
*/

// Step 1

new Date(moment('2020-07-01 09:30').toDate());

// Rest on Sat & Sun
const weekdayRule = new RRule({
  freq: RRule.WEEKLY,
  dtstart: new Date(moment.utc('2020-07-01 09:00').toDate()), // Date.UTC(2020, 7, 1, 0, 0, 0)
  until: new Date(moment.utc('2020-11-30 15:30').toDate()), // Date.UTC(2020, 11, 31, 14, 20, 0)
  interval: 1,
  byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
});

const lunchRule = new RRule({
  freq: RRule.WEEKLY,
  dtstart: new Date(moment.utc('2020-07-01 12:00').toDate()), // Date.UTC(2020, 7, 1, 12, 0, 0)
  until: new Date(moment.utc('2020-11-30 14:00').toDate()), // Date.UTC(2020, 11, 31, 14, 20, 0)
  interval: 1,
  byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
});

const weekendsRule = new RRule({
  freq: RRule.WEEKLY,
  dtstart: new Date(moment.utc('2020-07-01 00:00').toDate()), // Date.UTC(2020, 7, 1, 9, 0, 0)
  until: new Date(moment.utc('2020-11-30 14:00').toDate()), // Date.UTC(2020, 11, 31, 14, 20, 0)
  interval: 1,
  byweekday: [RRule.SA, RRule.SU],
});

const weekdayIncl = {
  include: true,
  ruleInstruction: weekdayRule,
  duration: { count: 8, unit: 'hours' },
};
const lunchExcl = {
  include: false,
  ruleInstruction: lunchRule,
  duration: { count: 2, unit: 'hours' },
};
const weekendExcl = {
  include: false,
  ruleInstruction: weekendsRule,
  duration: { count: 1, unit: 'days' },
};

const rules = [
  weekdayIncl,
  // lunchExcl, weekendExcl
];

const booking = {
  startTime: moment.utc('2020-09-03 09:30'),
  endTime: moment.utc('2020-09-03 10:30'),
};

rules.forEach(rule => {
  const ruleString = rule.ruleInstruction.toString();
  const ruleArrayDates = RRule.fromString(ruleString).all();
  // console.log(ruleString);
  console.log(ruleArrayDates);

  const ruleArrayObjects = ruleArrayDates.map(date => {
    return {
      startTime: moment(date),
      endTime: moment(date).add(rule.duration.count, rule.duration.unit),
    };
  });

  // console.log(ruleArrayObjects);

  // if (rule.include) {
  //   ruleArrayObjects.forEach(sessionEach => {
  //     if (
  //       !booking.startTime.isBetween(sessionEach.startTime, sessionEach.endTime)
  //     ) {
  //       // console.log('1');
  //       throw { bookingStartTime: booking.startTime, sessionEach };
  //     }

  //     if (
  //       !booking.endTime.isBetween(sessionEach.startTime, sessionEach.endTime)
  //     ) {
  //       // console.log('2');
  //       throw 'Bad 2';
  //     }

  //     if (!booking.startTime.isSame(sessionEach.endTime)) {
  //       // console.log('3');
  //       throw 'Bad 3';
  //     }

  //     if (!booking.endTime.isSame(sessionEach.startTime)) {
  //       // console.log('4');
  //       throw 'Bad 4';
  //     }
  //   });
  // } else {
  //   ruleArrayObjects.forEach(sessionEach => {
  //     if (
  //       booking.startTime.isBetween(
  //         sessionEach.startTime,
  //         sessionEach.endTime
  //       ) ||
  //       booking.endTime.isBetween(sessionEach.startTime, sessionEach.endTime) ||
  //       booking.startTime.isSame(sessionEach.startTime) ||
  //       booking.endTime.isSame(sessionEach.endTime) ||
  //       booking.startTime.isSame(sessionEach.endTime) ||
  //       booking.endTime.isSame(sessionEach.startTime)
  //     ) {
  //       // console.log('This time is not available');
  //       return;
  //     }
  //   });
  // }
});

// Case 2
// Available
// {
//   startTime: Moment<2020-09-03T09:00:00+10:00>,
//   endTime: Moment<2020-09-03T17:00:00+10:00>
// },

// If we choose to filter by date

// Case 1
// Break
// {
//   startTime: Moment<2020-09-03T12:00:00+10:00>,
//   endTime: Moment<2020-09-03T14:00:00+10:00>
// },

// Case 2
// {
//   startTime: Moment<2020-08-01T19:00:00+10:00>,
//   endTime: Moment<2020-10-01T03:00:00+10:00>
// },

// console.log(ruleArrayObjects);

// [{
//   startTime: Moment<2020-07-01T19:00:00+10:00>,
//   endTime: Moment<2020-07-02T03:00:00+10:00>
// },
// {
//   startTime: Moment<2020-07-02T19:00:00+10:00>,
//   endTime: Moment<2020-07-03T03:00:00+10:00>
// }]

{
  // console.log(sessionEach);
  // if (
  //   !(
  //     booking.startTime.isBetween(
  //       sessionEach.startTime,
  //       sessionEach.endTime
  //     ) ||
  //     booking.endTime.isBetween(
  //       sessionEach.startTime,
  //       sessionEach.endTime
  //     ) ||
  //     booking.startTime.isSame(sessionEach.endTime) ||
  //     booking.endTime.isSame(sessionEach.startTime)
  //   )
  // ) {
  //   // console.log('This time is not available');
  //   return;
  // }
}
