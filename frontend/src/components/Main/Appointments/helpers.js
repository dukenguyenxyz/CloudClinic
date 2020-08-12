import { v4 } from 'uuid';
import { RRule } from 'rrule';
import moment from 'moment';
import _ from 'lodash';

// Helper methods
export const workingDays = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR];

export const convertUTC = date => moment.utc(date).toDate(); // '2020-07-01 09:00'

export const formatTimeHour = time =>
  moment(time, moment.ISO_8601).format('h:mm aa');

export const formatTimeDate = time =>
  moment(time, moment.ISO_8601).format('MMMM d, h:mm aa');

export function round(date, duration, method) {
  return moment(Math[method](+date / +duration) * +duration);
}

export const sanitizeDoctorSessions = sessions => {
  const newRRuleSet = bluePrint => {
    const newRRule = {
      dtstart: convertUTC(bluePrint.startDateTime), // new Date(Date.UTC(2012, 1, 1, 10, 30)) (CONVERT THIS TO UTC)
      until: convertUTC(moment(bluePrint.startDateTime).add(12, 'months')), // new Date(Date.UTC(2012, 1, 1, 10, 30))
      interval: 1,
    };

    console.log(newRRule);

    if (bluePrint.modifier) newRRule.freq = bluePrint.modifier;
    if (bluePrint.byweekday) newRRule.byweekday = bluePrint.byweekday;

    return new RRule(newRRule);
  };

  // Sanitize the unavailable hours
  return sessions.map(session => {
    return {
      duration: moment(session.endDateTime).diff(
        session.startDateTime,
        'minutes'
      ), //integer
      include: false,
      ruleInstruction: newRRuleSet(session).toString(),
      ruleInstructionText: newRRuleSet(session).toText(),
    };
  });
};

export const convertAPIdataToJS = array => {
  // BUG IS HERE
  const convertedData = array.map(arrayItem => {
    const rruleObject = RRule.fromString(arrayItem.ruleInstruction);
    const ruleAll = rruleObject.all();

    const title = arrayItem.include ? 'Available' : 'Unavailable';
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
