import React, { useEffect, useState } from 'react';
import PatientListItem from '../PatientListItem/PatientListItem';
import Card from '../../../Card/Card';
import './PatientList.scss';
import { viewClients } from '../../../AxiosTest/userRoutes';
import { v4 as uuidv4 } from 'uuid';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await viewClients();
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
            <li key={uuidv4()}>
              <PatientListItem
                name={`${user.firstName} ${user.lastName}`}
                id={user._id}
                state={user}
                image={''}
              />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default PatientList;
