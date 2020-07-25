import React, { useEffect, useState } from 'react';
import PatientListItem from '../PatientListItem/PatientListItem';
import Card from '../../../Card/Card';
import axios from 'axios';
import './PatientList.scss';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  // const getUsers = async () => {
  //   try {
  //     const res = await axios
  //       .get('https://jsonplaceholder.typicode.com/users')
  //       .then(data => setUsers(data.data));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const jwt = localStorage.getItem('jwt');
  const developmentUrl = 'http://localhost:5000';
  // const productionUrl = 'http://cloudclinic.tech';
  const endpoint = `${developmentUrl}/api/users/clients/`;
  // const clientsEndpoint = `${developmentUrl}/api/users/clients`;

  // const res = await axios.get(endpoint, {
  //   headers: {
  //     'Authorization': jwt
  //   }
  // });

  const getPatients = async () => {
    try {
      const res = await axios
        .get(endpoint, {
          headers: {
            Authorization: jwt,
          },
        })
        .then(response => {
          console.log('API request made to backend');
          console.log(response);
          console.log(response.body);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPatients();
  }, []);
  return (
    <div className="patient-list-wrapper">
      <Card>
        <ul>
          {patients.map(user => (
            <PatientListItem key={user.name} name={user.name} id={user.id} />
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default PatientList;
