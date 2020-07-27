import axios from 'axios';
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';
import { RRule, RRuleSet, rrulestr } from 'rrule';
import moment from 'moment';
import {
  url,
  request,
  JWTHeader,
  JSONHeader,
  newUserClient,
  newUserDoctor,
} from './config.js';

// Session Routes

// export const viewSessions = async () => {
//   await request
//     .get('sessions', {})
//     .then(res => {
//       console.log(res.data);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// useEffect(async () => {
//   const result = await axios(
//     'https://hn.algolia.com/api/v1/search?query=redux',
//   );

// cosnt convertedData = convertAPIDATAtoJS(result)

// setCalendar(convertedData)
//   setData(result.data);
// });

//remove data for actual call
export const viewSessions = async (callback, data) => {
  const convertAPIdataToJS = array => {
    return data.map(session => {
      const rruleObject = RRule.fromString(session.ruleInstruction);
      const start = moment(rruleObject.dtstart);

      const difference = moment(session.endDateTime).diff(start);
      // const duration = moment.duration(moment(session.endDateTime).diff(start));
      const clone = start.clone();

      const end = clone.add(difference, 'minutes');

      // console.log('Session object', session);
      // console.log('session end date time', session.endDateTime);
      // console.log('Duration:', duration);
      // console.log('Start:', start.toDate());
      // console.log('End:', end.toDate());

      return {
        id: uuidv4(),
        start: start.toDate(),
        end: end.toDate(),
      };
    });
  };

  const convertedData = convertAPIdataToJS();

  // callback(convertedAPI);

  // console.log(convertedData);
  return convertedData;

  await request
    .get('sessions', {})
    .then(res => {
      const convertedAPI = convertAPIdataToJS(res.data);
      // console.log(res.data);
      callback(convertedAPI);
    })
    .catch(err => {
      console.log(err);
    });
};

export const createSessions = async sessions => {
  await request
    .post('sessions', sessions)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteSession = async sessionID => {
  await request
    .delete(`sessions/${sessionID}`)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const bookSession = async sessionID => {
  await request
    .patch(`sessions/${sessionID}/book`)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateSession = async (sessionID, session) => {
  await request
    .patch(`sessions/${sessionID}/update`, session)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const cancelSession = async sessionID => {
  await request
    .patch(`sessions/${sessionID}/cancel`)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

const getSessions = async () => {
  await axios
    .get(`${url}/api/sessions`, JWTHeader)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};
