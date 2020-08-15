import axios from 'axios';
import { navigate } from '@reach/router';

// import faker from 'faker';
import {
  url,
  request,
  JSONHeader,
  newUserClient,
  newUserDoctor,
} from './config.js';

// const { user, setUser } = useContext(AuthContext);

// User Routes

// Hardcoded ? -- START
// Route in production
export const signUpUser = async (
  user,
  setUserCallback,
  redirect,
  errorHandler
) => {
  await axios
    .post(`${url}/api/users/signup`, user, JSONHeader)
    .then(res => {
      localStorage.setItem('cloudclinicJWT', res.data.token);
      setUserCallback(res.data.user);
      navigate(redirect);
    })
    .catch(err => {
      console.log(err);
      errorHandler(err);
    });
};

// Testing routes
export const signUpClient = async setUserCallback => {
  console.log(newUserClient);
  await axios
    .post(`${url}/api/users/signup`, newUserClient, JSONHeader)
    .then(res => {
      console.log(res);
      localStorage.setItem('cloudclinicJWT', res.data.token);
      setUserCallback(res.data.user);
    })
    .catch(err => {
      console.log(err);
    });
};

export const signUpDoctor = async setUserCallback => {
  console.log(newUserDoctor);
  await axios
    .post(`${url}/api/users/signup`, newUserDoctor, JSONHeader)
    .then(res => {
      console.log(res);
      localStorage.setItem('cloudclinicJWT', res.data.token);
      setUserCallback(res.data.user);
    })
    .catch(err => {
      console.log(err);
    });
};

export const signInClient = async setUserCallback => {
  await request
    .post('users/signin', {
      email: newUserClient.email,
      password: newUserClient.password,
    })
    .then(res => {
      console.log(res);
      localStorage.setItem('cloudclinicJWT', res.data.token);
      setUserCallback(res.data.user);
    })
    .catch(err => {
      console.log(err);
    });
};

export const signInDoctor = async setUserCallback => {
  await request
    .post('users/signin', {
      email: newUserDoctor.email,
      password: newUserDoctor.password,
    })
    .then(res => {
      console.log(res);
      localStorage.setItem('cloudclinicJWT', res.data.token);
      setUserCallback(res.data.user);
    })
    .catch(err => {
      console.log(err);
    });
};
// Hardcoded ? -- END

export const signInUser = async signInObj => {
  return await request.post('users/signin', signInObj); // emaill & password
  // .then(res => {
  //   console.log(res);
  //   localStorage.setItem('cloudclinicJWT', res.data.token);
  //   // setUserCallback(res.data.user);
  // })
  // .catch(err => {
  //   console.log(err);
  // });

  // return response;
};

export const signOut = async (setUserCallback, redirect) => {
  await request
    .patch('users/signout')
    .then(res => {
      console.log(res);
      localStorage.removeItem('cloudclinicJWT');
      setUserCallback(null);
      navigate(redirect);
    })
    .catch(err => {
      console.log(err);
    });
};

export const signOutAll = async (setUserCallback, redirect) => {
  await request
    .patch('users/signoutall')
    .then(res => {
      console.log(res);
      localStorage.removeItem('cloudclinicJWT');
      setUserCallback(null);
      navigate(redirect);
    })
    .catch(err => {
      console.log(err);
    });
};

export const viewProfile = async () => {
  const response = await request
    .get('users/profile')
    // .then(res => {
    //   console.log(res);
    // })
    .catch(err => {
      console.log(err);
    });

  return response;
};

export const updateProfile = async updateParamsObj => {
  const response = await request
    .patch('users/profile', updateParamsObj)
    // .then(res => {
    //   console.log(res);
    //   setUserCallback(res.data);
    // })
    .catch(err => {
      console.log(err);
    });

  return response;
};

//test update
export const updateProfileTesting = async (callback, updateParamsObj) => {
  await request
    .patch('users/profile', updateParamsObj)
    .then(res => {
      callback(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteProfile = async (setUserCallback, redirect) => {
  await request
    .delete('users/profile')
    .then(res => {
      console.log(res);
      localStorage.removeItem('cloudclinicJWT');
      setUserCallback(null);
      navigate(redirect);
    })
    .catch(err => {
      console.log(err);
    });
};

export const viewClients = async () => {
  const response = await request
    .get('users/clients')
    // .then(res => {
    //   console.log(res);
    // })
    .catch(err => {
      console.log(err);
    });

  return response;
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
  const response = await request
    .get('users')
    // .then(res => {
    //   console.log(res);
    // })
    .catch(err => {
      console.log(err);
    });

  return response;
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
