// @flow

import { v4 } from 'uuid';
import { RRule, RRuleSet, rrulestr } from 'rrule';
import moment from 'moment';
import _ from 'lodash';

// Helper methods
export const workingDays = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR];

export const convertUTC = (date: Date) => moment.utc(date).toDate(); // '2020-07-01 09:00'

export const formatTimeHour = (time: string) =>
  moment(time, moment.ISO_8601).format('h:mm aa');

export const formatTimeDate = (time: string) =>
  moment(time, moment.ISO_8601).format('MMMM d, h:mm aa');

export function round(date: Date, duration: number, method: Function) {
  return moment(Math[method](+date / +duration) * +duration);
}

export const sanitizeDoctorSessions = (sessions: Array<mixed>) => {
  const newRRuleSet = (bluePrint: {
    startDateTime: Date,
    modifier: number,
    byweekday: Array<number>,
  }) => {
    const newRRule: {
      dtstart: Date,
      until: Date,
      interval: number,
      freq: any,
      byweekday: Array<number>,
    } = {
      dtstart: convertUTC(bluePrint.startDateTime), // new Date(Date.UTC(2012, 1, 1, 10, 30)) (CONVERT THIS TO UTC)
      until: convertUTC(moment(bluePrint.startDateTime).add(12, 'months')), // new Date(Date.UTC(2012, 1, 1, 10, 30))
      interval: 1,
      freq: undefined,
      byweekday: [],
    };

    if (bluePrint.modifier) newRRule.freq = bluePrint.modifier;
    if (bluePrint.byweekday) newRRule.byweekday = bluePrint.byweekday;

    return new RRule(newRRule);
  };

  type Session = { startDateTime: Date, endDateTime: Date };
  type returnedSession = {
    duration: Number,
    include: Boolean,
    ruleInstruction: String,
    ruleInstructionText: String,
  };

  // Sanitize the unavailable hours
  return sessions.map<Session>((session: Session) => {
    const result: returnedSession = {
      duration: moment(session.endDateTime).diff(
        session.startDateTime,
        'minutes'
      ), //integer
      include: false,
      ruleInstruction: newRRuleSet(session).toString(),
      ruleInstructionText: newRRuleSet(session).toText(),
    };
    return result;
  });
};

export const convertAPIdataToJS = (array: Array<mixed>) => {
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
