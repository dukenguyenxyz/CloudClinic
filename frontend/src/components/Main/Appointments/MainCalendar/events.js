import { v4 } from 'uuid';
import { RRule, RRuleSet, rrulestr } from 'rrule';
import moment from 'moment';
import _ from 'lodash';

export const convertAPIdataToJS = array => {
  // const convertAPIdataToJS = array => {
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
