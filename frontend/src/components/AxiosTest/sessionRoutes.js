import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { RRule } from 'rrule';
import moment from 'moment';
import { url, request, JWTHeader } from './config.js';

// Session Routes

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

      return {
        id: uuidv4(),
        start: start.toDate(),
        end: end.toDate(),
      };
    });
  };

  const convertedData = convertAPIdataToJS();
  return convertedData;
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
