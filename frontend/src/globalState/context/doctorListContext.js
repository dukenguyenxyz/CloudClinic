import React, { useState, useEffect } from 'react';
import { viewDoctors } from '../../components/AxiosTest/userRoutes';

export const DoctorListContext = React.createContext();
export const DoctorListContextProvider = ({ children }) => {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    const getDoctors = async () => {
      if (doctorList.length === 0) {
        try {
          const response = await viewDoctors();
          const doctorsResult = response.data.map(doctor => {
            const mappedDoctor = { ...doctor };
            delete mappedDoctor.workSchedule;
            return mappedDoctor;
          });
          setDoctorList(doctorsResult);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getDoctors();
  }, []);

  const doctorListState = {
    doctorList,
    setDoctorList,
  };

  return (
    <DoctorListContext.Provider value={doctorListState}>
      {children}
    </DoctorListContext.Provider>
  );
};
