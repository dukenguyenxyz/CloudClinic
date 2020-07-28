import React, { useState } from 'react';

export const AuthContext = React.createContext();
export const AuthContextProvider = ({ children }) => {
  // First time user
  // const [user, setUser] = useState(null);

  // ***** SUPER USER DOCTOR ****** //
  // const [user, setUser] = useState({
  //   address: {
  //     number: 173,
  //     street: 'Amya Divide',
  //     city: 'Halvorsontown',
  //     state: 'Utah',
  //     country: 'Poland',
  //     postcode: 76960,
  //   },
  //   doctorInfo: {
  //     accreditations: ['Doctor of Medicine'],
  //     education: ['Australian National University'],
  //     tags: [],
  //     languagesSpoken: ['Portuguese'],
  //     licence: 'AustDocL36',
  //     specialtyField: 'Cardiology',
  //     subSpecialtyField: 'Paediatrics',
  //     yearsExperience: 42,
  //     rating: 3,
  //   },
  //   _id: '5f1ce5596be99c5a19d56461',
  //   firstName: 'Lamar',
  //   lastName: 'Stoltenberg',
  //   sex: 'male',
  //   dateOfBirth: '2020-06-19T09:06:39.083Z',
  //   phoneNumber: '596-170-7132 x438',
  //   email: 'Vivian36@gmail.com',
  //   title: 'Dr',
  //   isDoctor: true,
  //   createdAt: '2020-07-26T02:07:22.335Z',
  //   __v: 1,
  // });

  // localStorage.setItem(
  //   'jwt',
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFjZTU1OTZiZTk5YzVhMTlkNTY0NjEiLCJpYXQiOjE1OTU3MjkzMDZ9.lFfagdvCoeHtM-TMZvPvYdSN7-2b49n4biJdyOK82lk'
  // );

  // ***** SUPER USER CLIENT ****** //
  const [user, setUser] = useState({
    address: {
      number: 122,
      street: 'Jamel Way',
      city: 'Ortizside',
      state: 'Tennessee',
      country: 'United States of America (the)',
      postcode: 37211,
    },
    clientInfo: {
      weight: 54,
      medicalHistory: [
        {
          _id: '5f1ce55a6be99c5a19d56472',
          startDate: '2020-07-25T15:05:31.384Z',
          condition: 'influenza',
          notes: 'Lorem Ipsum',
        },
      ],
      allergies: [
        {
          severity: 4,
          _id: '5f1ce55a6be99c5a19d56473',
          name: 'soy',
        },
      ],
      medication: [
        {
          _id: '5f1ce55a6be99c5a19d56474',
          name: 'ibuprofen',
          dosage: 4,
          manufacturer: 'Nienow Group',
        },
      ],
      bloodType: 'A+',
    },
    _id: '5f1ce5596be99c5a19d56444',
    firstName: 'Bert',
    lastName: 'Hills',
    sex: 'female',
    dateOfBirth: '2019-08-07T19:55:05.291Z',
    phoneNumber: '(184) 649-5525 x674',
    email: 'Wyatt14@hotmail.com',
    title: 'Rev',
    isDoctor: false,
    createdAt: '2020-07-26T02:07:22.294Z',
    __v: 1,
  });

  // localStorage.setItem(
  //   'jwt',
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFjZTU1OTZiZTk5YzVhMTlkNTY0NDQiLCJpYXQiOjE1OTU3MjkzNDZ9.uUyropLCHhA61YxS0utt1l59Rf6vMr4VUWMQhA_nitE'
  // );

  // const checkIfUserExists = () => {
  //   const jwt = localStorage.get
  // }

  const authState = {
    user,
    setUser,
  };
  return (
    <AuthContext.Provider value={authState}> {children} </AuthContext.Provider>
  );
};
