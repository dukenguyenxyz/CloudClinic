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
          setDoctorList(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getDoctors();
  }, [doctorList]);

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
