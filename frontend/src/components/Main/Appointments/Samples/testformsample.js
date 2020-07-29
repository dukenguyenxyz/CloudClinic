const moment = require('moment');
const { RRule, RRuleSet, rrulestr } = require('rrule');

const TestForm1 = () => {
  const formState = {
    openingTime: moment().set({ hour: 6, minute: 0 }).toDate(),
    closingTime: moment().set({ hour: 18, minute: 0 }).toDate(),
    lunchBreakStart: moment().set({ hour: 12, minute: 0 }).toDate(),
    lunchBreakEnd: moment().set({ hour: 13, minute: 0 }).toDate(),
    unavailableDateTimes: {
      startDateTime: moment().toDate(),
      endDateTime: moment().toDate(),
    },
    duration: 1,
    unit: 'days',
    allDay: false,
    everyWeek: false,
    daily: false,
    rrule: '',
  };

  const ruleSet = new RRuleSet();

  ruleSet.rrule(
    new RRule({
      freq: RRule.WEEKLY, // if weekly is true
      interval: 1, // do not skip any week
      // byweekday: [RRule.MO, RRule.FR], // on which day of the week
      dtstart: moment().set({ hour: 6, minute: 0 }).toDate(), // date start
      until: moment().add(50, 'days').set({ hour: 8, minute: 0 }).toDate(), // date ends
    })
  );

  const ruleString = ruleSet.toString();
  const ruleArrayDates = RRule.fromString(ruleString).all();

  const ruleArrayObjects = ruleArrayDates.map(date => {
    return {
      startTime: date,
      endTime: moment(date).add(formState.duration, formState.unit).toDate(),
    };
  });

  //weeks
  //hours
  //days
  console.log('Testform1', ruleArrayObjects);

  // console.log(ruleString);

  const rruleSet = new RRuleSet();

  rruleSet.rrule(
    new RRule({
      freq: RRule.WEEKLY, // if weekly is true
      interval: 1, // do not skip any week
      byweekday: [RRule.MO, RRule.FR], // on which day of the week
      dtstart: moment().set({ hour: 6, minute: 0 }).toDate(), // date start
      until: moment().set({ hour: 8, minute: 0 }).toDate(), // date ends
    })
  );

  // console.log(rruleSet);

  //   All Day && Weekly
  // All Day cannot && Daily
  // Daily cannot && Weekly

  const setEveryWeek = () => {
    // return a rrule string based on the startDate the endDatetime and the EveryWeek boolean
  };

  const aggregateUnavailability = () => {};
};

const TestForm2 = () => {
  console.log('TestForm2 starts');
  const formState = {
    endTime: moment([2020, 8, 27]).set({ hour: 17, minute: 0 }).toDate(),
    startTimeDate: moment([2020, 8, 27]).set({ hour: 9, minute: 0 }).toDate(),
    endDate: moment([2020, 13, 30]).set({ hour: 23, minute: 0 }).toDate(),
    frequency: 'WEEKLY', // yearly, monthly, weekly, daily, hourly
    // count: 30, // number
    interval: 1, // number
    byweekday: ['MO', 'TUE', 'WE', 'TH', 'FR'], //MO/TU/WE/THU/FR/SA/SU
  };

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
      return RRule[day];
    });
  };

  console.log(() => weekDayGen(formState.byweekday));

  const doctorSchedules = new RRuleSet();

  const newRRulSet = ruleBluePrint => {
    const newRule = new RRule({
      freq: RRule[ruleBluePrint.frequency],
      dtstart: ruleBluePrint.startTimeDate,
      until: ruleBluePrint.endDate,
      // count: ruleBluePrint.count, // not required
      interval: ruleBluePrint.interval,
      byweekday: weekDayGen(ruleBluePrint.byweekday),
    });
    return newRule;
  };

  // // Add working hours rule
  // const newRule = newRRulSet(formState)
  // doctorSchedules.rrule(newRule);

  // // Exclude mah tea time
  // const newExclude = newRRulSet(lunchBreak)
  // doctorSchedules.exrule(newExclude);

  // console.log('TestForm2', doctorSchedules);
};

const TestForm3 = () => {
  const getDay = i =>
    [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA, RRule.SU][i];

  const getOptionsCode = function (options) {
    const days = [
      'RRule.MO',
      'RRule.TU',
      'RRule.WE',
      'RRule.TH',
      'RRule.FR',
      'RRule.SA',
      'RRule.SU',
    ];

    const items = Object.keys(options).map(k => {
      let v = options[k];
      if (v === null) {
        v = 'null';
      } else if (k === 'freq') {
        v = `RRule.${RRule.FREQUENCIES[v]}`;
      } else if (k === 'dtstart' || k === 'until') {
        const d = v;
        v =
          'new Date(Date.UTC(' +
          [
            d.getUTCFullYear(),
            d.getUTCMonth(),
            d.getUTCDate(),
            d.getUTCHours(),
            d.getUTCMinutes(),
            d.getUTCSeconds(),
          ].join(', ') +
          '))';
      } else if (k === 'byweekday') {
        if (Array.isArray(v)) {
          v = v.map(function (wday) {
            console.log('wday', wday);
            let s = days[wday.weekday];
            if (wday.n) {
              return s + `.nth(${wday.n})`;
            }
            return s;
          });
        } else {
          const w = v;
          v = days[w.weekday];
        }
      } else if (k === 'wkst') {
        if (v === RRule.MO) {
          return '';
        }
        const w = v;
        v = days[w.weekday];
      }
      if (Array.isArray(v)) {
        v = `[${v.join(', ')}]`;
      }
      console.log(k, ' =', v);
      return `${k}: ${v}`;
    });

    return `{\n  ${items.filter(v => !!v).join(',\n  ')}\n}`;

    switch (inputMethod) {
      case 'text':
        makeRule = () => RRule.fromText($in.val().toString());
        init = `RRule.fromText("${this.value}")`;
        break;
      case 'options':
        let values = getFormValues($in.parents('form'));
        let options = {};
        for (const k in values) {
          const key = k;
          let value = values[key];
          if (!value) {
            continue;
          }
          switch (key) {
            case 'dtstart':
            case 'until':
              const date = new Date(Date.parse(value + 'Z'));
              options[key] = date;
              continue;
            case 'byweekday':
              if (Array.isArray(value)) {
                options[key] = value.map(i => getDay(parseInt(i, 10)));
              } else {
                options[key] = getDay(parseInt(value, 10));
              }
              continue;
            case 'wkst':
              options[key] = getDay(parseInt(value, 10));
              continue;
            case 'interval':
              const i = parseInt(value, 10);
              if (i === 1 || !value) {
                continue;
              }
              options[key] = i;
              continue;
            case 'tzid':
              options[key] = value;
              continue;
            case 'byweekday':
            case 'byweekno':
            case 'byhour':
            case 'byminute':
            case 'bysecond':
            case 'byyearday':
            case 'bymonth':
            case 'bymonthday':
            case 'bysetpos':
            case 'bynmonthday':
              if (!Array.isArray(value)) {
                value = value.split(/[,\s]+/);
              }
              value = value.filter(v => v);
              options[key] = value.map(n => parseInt(n, 10));
              continue;
            case 'bynweekday':
              if (!Array.isArray(value)) {
                value = value.split(/[,\s]+/);
              }
              value = value.filter(v => v);
              options[key] = [value.map(n => parseInt(n, 10))];
              continue;
            case 'byeaster':
              options[key] = parseInt(value, 10);
              continue;
            case 'freq':
            case 'count':
              options[key] = parseInt(value, 10);
              continue;
            default:
              console.warn('Unsupported key', key);
              continue;
          }
        }
        makeRule = () => new RRule(options);
        init = `new RRule(${getOptionsCode(options)})`;
        console.log(options);
        break;
    }
  };
};

// TestForm1()
// TestForm2()
