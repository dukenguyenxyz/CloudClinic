import React, { useEffect, useState } from 'react';
import PatientListItem from '../PatientListItem/PatientListItem';
import Card from '../../../Card/Card';
import './PatientList.scss';
import { viewClients } from '../../../AxiosTest/userRoutes';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await viewClients();
        // console.log(response);
        setPatients(response.data);
      } catch (err) {
        console.log(err);
        setPatients(['Something went wrong, bad request']);
      }
    };
    fetchData();
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
