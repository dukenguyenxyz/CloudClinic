import React, { useEffect, useState } from 'react';
import { viewDoctors } from '../../AxiosTest/userRoutes';
import { v4 as uuidv4 } from 'uuid';
import Card from '../../Card/Card';
import DoctorListItem from '../DoctorListItem/DoctorListItem';
// import { Link } from '@reach/router';
// import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
const SearchDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await viewDoctors();
        setDoctors(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="doctor-list-wrapper">
      <Card>
        <ul>
          {doctors.map(doctor => (
            <li key={uuidv4()}>
              <DoctorListItem doctor={doctor} />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default SearchDoctors;
