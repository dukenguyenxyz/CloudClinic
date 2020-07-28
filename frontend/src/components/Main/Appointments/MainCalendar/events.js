// import { v4 } from 'uuid';
// import { RRule, RRuleSet, rrulestr } from 'rrule';
// import moment from 'moment';
// import _ from 'lodash';

const { v4 } = require('uuid');
const { RRule, RRuleSet, rrulestr } = require('rrule');
const moment = require('moment');
const _ = require('lodash');

const add = require('date-fns/add');
const now = new Date();

// export const dateOneStart = moment.utc().toDate();
const dateOneStart = moment.utc().toDate();

const dateOneUntil = moment.utc().add({ days: 7, hours: 5 }).toDate();

const dateTwoStart = moment.utc().add({ days: 1, hours: 2 }).toDate();
const dateTwoUntil = moment.utc().add({ days: 13, hours: 8 }).toDate();

const ruleOne = new RRule({
  freq: RRule.WEEKLY,
  dtstart: dateOneStart,
  until: dateOneUntil,
});

const ruleTwo = new RRule({
  freq: RRule.DAILY,
  dtstart: dateTwoStart,
  until: dateTwoUntil,
});

const ruleStringified1 = ruleOne.toString();
const ruleStringified2 = ruleTwo.toString();

// export const sampleArr = [
const sampleArr = [
  {
    duration: 15, // integer, enum [15, 30, 60]
    include: false,
    ruleInstruction: ruleStringified1,
  },
  {
    duration: 30,
    include: false,
    ruleInstruction: ruleStringified2,
  },
];

const sample2Arr = [
  // {
  //   "id": "449b849e-9bcd-45f8-8eae-e3195b5cc252",
  //   "title": "Unavailable",
  //   "start": "2020-07-28T12:30:00.000Z",
  //   "end": "2020-07-31T13:00:00.000Z",
  //   "same": false
  // },
  // {
  //   "id": "f0ace152-3c16-43ca-94ac-819835d34724",
  //   "title": "Unavailable",
  //   "start": "2020-08-05T12:00:00.000Z",
  //   "end": "2020-09-05T13:00:00.000Z",
  //   "same": false
  // }
];

const sampleArr2 = [
  {
    duration: 4335,
    include: false,
    ruleInstruction: 'DTSTART:20200729T033000Z\nRRULE:UNTIL=20210129T023000Z',
  },
  {
    duration: 102195,
    include: false,
    ruleInstruction: 'DTSTART:20200811T210000Z\nRRULE:UNTIL=20210211T200000Z',
  },
];

const sampleArr3 = [
  {
    id: 'a19adb78-9654-44be-a56b-e4cafb29d6eb',
    title: 'Unavailable',
    start: '2020-07-28T20:00:00.000Z',
    end: '2020-07-28T20:15:00.000Z',
    same: false,
  },
];

//

// export const convertAPIdataToJS = array => {
const convertAPIdataToJS = array => {
  //BUG IS HERE
  const convertedData = array.map(arrayItem => {
    const rruleObject = RRule.fromString(arrayItem.ruleInstruction);

    console.log(rruleObject);
    const ruleAll = rruleObject.all();

    const title = arrayItem.include ? 'Available' : 'Unavailable';
    // console.log(ruleAll);
    return ruleAll.map(startTime => {
      const start = moment(startTime).toDate();
      const end = moment(start).add({ minutes: arrayItem.duration }).toDate();

      return {
        id: v4(),
        title,
        start: start,
        end: end,
        same: moment(start).isSame(moment(end)),
      };
    });
  });

  return _.flattenDeep(convertedData);
};

//bug vvvvv
const newArr = convertAPIdataToJS(sampleArr3);
console.log(newArr);

{
  // export default [
  //   {
  //     id: 0,
  //     title: 'All Day Event very long title',
  //     allDay: true,
  //     start: new Date(2015, 3, 0),
  //     end: new Date(2015, 3, 1),
  //   },
  //   {
  //     id: 1,
  //     title: 'Long Event',
  //     start: new Date(2015, 3, 7),
  //     end: new Date(2015, 3, 10),
  //   },
  //   {
  //     id: 2,
  //     title: 'DTS STARTS',
  //     start: new Date(2016, 2, 13, 0, 0, 0),
  //     end: new Date(2016, 2, 20, 0, 0, 0),
  //   },
  //   {
  //     id: 3,
  //     title: 'DTS ENDS',
  //     start: new Date(2016, 10, 6, 0, 0, 0),
  //     end: new Date(2016, 10, 13, 0, 0, 0),
  //   },
  //   {
  //     id: 4,
  //     title: 'Some Event',
  //     start: new Date(2015, 3, 9, 0, 0, 0),
  //     end: new Date(2015, 3, 10, 0, 0, 0),
  //   },
  //   {
  //     id: 5,
  //     title: 'Conference',
  //     start: new Date(2015, 3, 11),
  //     end: new Date(2015, 3, 13),
  //     desc: 'Big conference for important people',
  //   },
  //   {
  //     id: 6,
  //     title: 'Meeting',
  //     start: new Date(2015, 3, 12, 10, 30, 0, 0),
  //     end: new Date(2015, 3, 12, 12, 30, 0, 0),
  //     desc: 'Pre-meeting meeting, to prepare for the meeting',
  //   },
  //   {
  //     id: 7,
  //     title: 'Lunch',
  //     start: new Date(2015, 3, 12, 12, 0, 0, 0),
  //     end: new Date(2015, 3, 12, 13, 0, 0, 0),
  //     desc: 'Power lunch',
  //   },
  //   {
  //     id: 8,
  //     title: 'Meeting',
  //     start: new Date(2015, 3, 12, 14, 0, 0, 0),
  //     end: new Date(2015, 3, 12, 15, 0, 0, 0),
  //   },
  //   {
  //     id: 9,
  //     title: 'Happy Hour',
  //     start: new Date(2015, 3, 12, 17, 0, 0, 0),
  //     end: new Date(2015, 3, 12, 17, 30, 0, 0),
  //     desc: 'Most important meal of the day',
  //   },
  //   {
  //     id: 10,
  //     title: 'Dinner',
  //     start: new Date(2015, 3, 12, 20, 0, 0, 0),
  //     end: new Date(2015, 3, 12, 21, 0, 0, 0),
  //   },
  //   {
  //     id: 11,
  //     title: 'Birthday Party',
  //     start: new Date(2015, 3, 13, 7, 0, 0),
  //     end: new Date(2015, 3, 13, 10, 30, 0),
  //   },
  //   {
  //     id: 12,
  //     title: 'Late Night Event',
  //     start: new Date(2015, 3, 17, 19, 30, 0),
  //     end: new Date(2015, 3, 18, 2, 0, 0),
  //   },
  //   {
  //     id: 12.5,
  //     title: 'Late Same Night Event',
  //     start: new Date(2015, 3, 17, 19, 30, 0),
  //     end: new Date(2015, 3, 17, 23, 30, 0),
  //   },
  //   {
  //     id: 13,
  //     title: 'Multi-day Event',
  //     start: new Date(2015, 3, 20, 19, 30, 0),
  //     end: new Date(2015, 3, 22, 2, 0, 0),
  //   },
  //   {
  //     id: 14,
  //     title: 'Today',
  //     start: new Date(new Date().setHours(new Date().getHours() - 3)),
  //     end: new Date(new Date().setHours(new Date().getHours() + 3)),
  //   },
  //   {
  //     id: 15,
  //     title: 'Point in Time Event',
  //     start: now,
  //     end: now,
  //   },
  // ];
}
