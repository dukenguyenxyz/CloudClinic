import React, { useEffect, useState } from 'react';
import { viewDoctor } from '../../AxiosTest/userRoutes';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

const ViewDoctor = props => {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    if (props.location.state !== null) {
      const doctor = props.location.state;
      setDoctor(doctor);
    }

    const getDoctor = async () => {
      const id = props.id;
      try {
        const response = await viewDoctor(id);
        setDoctor(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDoctor();
  }, []);

  const doctorProfile = () => {
    return (
      <div>
        <h1>hello {doctor.firstName}</h1>
      </div>
    );
  };

  return <div>{doctor ? doctorProfile() : <LoadingSpinner />}</div>;
};

export default ViewDoctor;
