import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  viewProfile,
  signUpClient,
  signUpDoctor,
} from '../../components/AxiosTest/userRoutes';

export const AuthContext = React.createContext();
export const AuthContextProvider = ({ children }) => {
  // First time user
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // handles fist page load with a valid user that has a jwt
  useEffect(() => {
    const jwt = localStorage.getItem('cloudclinicJWT');
    if (user === null && jwt) {
      const getUser = async () => {
        try {
          const response = await viewProfile();
          setUser(response.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
  }, []);

  // Client Generator

  // useEffect(() => {
  //   const generateUser = async () => {
  //     // await signUpClient(setUser);
  //     await signUpDoctor(setUser);
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 2000);
  //   };
  //   generateUser();
  // }, []);

  const authState = {
    user,
    setUser,
    isLoading,
    setIsLoading,
  };

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
