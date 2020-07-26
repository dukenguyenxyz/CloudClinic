import axios from 'axios';

const URL = 'http://localhost:5000';
// const URL = 'cloudclinic00.herokuapp.com';

// *** endpoints *** ///
const endpoint = `${URL}/api/users/sessions`;
// const endpoint = `${URL}/api/users/clients/${user._id}`;

const jwt = localStorage.getItem('jwt');

export const getUser = async () => {
  // get user and store in auth state on first page load or hard refresh

  if (jwt) {
    await axios.get(/*...*/);
  }
};

export const showSpinner = async () => {};
