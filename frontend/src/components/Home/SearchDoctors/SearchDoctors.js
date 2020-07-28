import React, { useEffect, useState } from 'react';
import { viewDoctors } from '../../AxiosTest/userRoutes';
import { v4 as uuidv4 } from 'uuid';
import { Link } from '@reach/router';

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
    <div>
      <ul>
        {doctors.map(doctor => {
          return (
            <Link to={`/${doctor._id}`} key={doctor._id} state={doctor}>
              <li>{`${doctor.firstName} ${doctor.lastName}`}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchDoctors;
