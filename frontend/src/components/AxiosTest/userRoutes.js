import axios from 'axios';
import { navigate } from '@reach/router';

// import faker from 'faker';
import {
  url,
  jwt,
  request,
  JWTHeader,
  JSONHeader,
  newUserClient,
  newUserDoctor,
} from './config.js';

// const { user, setUser } = useContext(AuthContext);

// User Routes

// Hardcoded ? -- START
export const signUpClient = async (
  user,
  setUserCallback,
  redirect,
  errorHandler
) => {
  await axios
    .post(`${url}/api/users/signup`, user, JSONHeader)
    .then(res => {
      console.log(res);
      localStorage.setItem('cloudclinicJWT', res.data.token);
      setUserCallback(res.data.user);
      navigate(redirect);
    })
    .catch(err => {
      console.log(err);
      errorHandler(err);
    });
};

export const signUpDoctor = async () => {
  await axios
    .post(`${url}/api/users/signup`, newUserDoctor, JSONHeader)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const signInClient = async () => {
  await request
    .post('users/signin', {
      email: newUserClient.email,
      password: newUserClient.password,
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const signInDoctor = async () => {
  await request
    .post('users/signin', {
      email: newUserDoctor.email,
      password: newUserDoctor.password,
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};
// Hardcoded ? -- END

export const signOut = async () => {
  await request
    .patch('users/signout', {})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const signOutAll = async () => {
  await request
    .patch('users/signoutall', {})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const viewProfile = async () => {
  console.log(jwt);

  await request
    .get('users/profile')
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateProfile = async obj => {
  await request
    .patch('users/profile', obj)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteProfile = async () => {
  await request
    .delete('users/profile', {})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const viewClients = async () => {
  await request
    .get('users/clients', {})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const viewClient = async clientID => {
  await request
    .get(`users/clients/${clientID}`, {})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const viewDoctors = async () => {
  await request
    .get('users', {})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const viewDoctor = async doctorID => {
  await request
    .get(`users/${doctorID}`, {})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};
