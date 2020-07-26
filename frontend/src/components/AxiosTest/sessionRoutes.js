import axios from 'axios';
import faker from 'faker';
import {
  url,
  request,
  JWTHeader,
  JSONHeader,
  newUserClient,
  newUserDoctor,
} from './config.js';

// Session Routes

export const viewSessions = async () => {
  await request
    .get('sessions', {})
    .then(res => {
      console.log(res.data);
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
