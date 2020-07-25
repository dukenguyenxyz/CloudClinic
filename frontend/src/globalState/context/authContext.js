import React, { useState } from 'react';

export const AuthContext = React.createContext();
export const AuthContextProvider = ({ children }) => {
  // First time user
  // const [user, setUser] = useState(null);

  // ***** SUPER USER ClIENT ****** //
  const [user, setUser] = useState({
    address: {
      number: 207,
      street: 'Hayes Lakes',
      city: 'Turcotteland',
      state: 'Alaska',
      country: 'Sweden',
      postcode: 98301,
    },
    clientInfo: {
      weight: 96,
      medicalHistory: [
        {
          _id: '5f1bc832150d891d48c5b543',
          startDate: '2020-07-24T07:03:51.091Z',
          condition: 'bronchitis',
          notes: 'Lorem Ipsum',
        },
      ],
      allergies: [
        {
          severity: 3,
          _id: '5f1bc832150d891d48c5b544',
          name: 'shellfish',
        },
      ],
      medication: [
        {
          _id: '5f1bc832150d891d48c5b545',
          name: 'prednisone',
          dosage: 2,
          manufacturer: 'Carter, Kertzmann and Dicki',
        },
      ],
      bloodType: 'A-',
    },
    _id: '5f1bc831150d891d48c5b518',
    firstName: 'Herman',
    lastName: 'Ullrich',
    sex: 'female',
    dateOfBirth: '2000-02-20T07:23:07.967Z',
    phoneNumber: '132.168.4313 x6094',
    email: 'Malika_Goyette0@gmail.com',
    title: 'Mr',
    isDoctor: false,
    createdAt: '2020-07-25T05:50:42.572Z',
    __v: 3,
  });

  localStorage.setItem(
    'jwt',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFiYzgzMTE1MGQ4OTFkNDhjNWI1MTgiLCJpYXQiOjE1OTU2NTY3OTV9.vKL6_0abWNFU6Xyy4lsuFaWmbLgParKkTFOcMKK5sn8'
  );

  // ***** SUPER USER DOCTOR ****** //
  // const [user, setUser] = useState({
  //   address: {
  //     number: 137,
  //     street: 'Lowe Village',
  //     city: 'West Ariannaview',
  //     state: 'New York',
  //     country: 'Montserrat',
  //     postcode: 61929,
  //   },
  //   doctorInfo: {
  //     accreditations: [],
  //     education: ['Monash University'],
  //     tags: [],
  //     languagesSpoken: ['German'],
  //     licence: 'AustDocL1',
  //     specialtyField: 'Gynecology',
  //     subSpecialtyField: 'Oncology',
  //     yearsExperience: 25,
  //     rating: 1,
  //   },
  //   _id: '5f1bc831150d891d48c5b536',
  //   firstName: 'Janelle',
  //   lastName: 'Marquardt',
  //   sex: 'male',
  //   dateOfBirth: '2020-02-09T06:18:49.243Z',
  //   phoneNumber: '713.247.7747',
  //   email: 'Pearl_Kuhic4@gmail.com',
  //   title: 'Dr',
  //   isDoctor: true,
  //   createdAt: '2020-07-25T05:50:42.653Z',
  //   __v: 3,
  // });

  // localStorage.setItem(
  //   'jwt',
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFiYzgzMTE1MGQ4OTFkNDhjNWI1MzYiLCJpYXQiOjE1OTU2NTY4Njd9.VhUcaHEQSrFNkc6Yy7nHsFy2KQdDME6PHjQv2Crqcdw'
  // );

  const authState = {
    user,
    setUser,
  };
  return (
    <AuthContext.Provider value={authState}> {children} </AuthContext.Provider>
  );
};
