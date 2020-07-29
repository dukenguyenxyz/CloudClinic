import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  viewProfile,
  signUpClient,
  signUpDoctor,
} from '../../components/AxiosTest/userRoutes';
// import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

export const AuthContext = React.createContext();
export const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  // First time user
  const [user, setUser] = useState(null);

  // handles fist page load with a valid user that has a jwt
  useEffect(() => {
    const jwt = localStorage.getItem('cloudclinicJWT');
    if (user === null && jwt) {
      const getUser = async () => {
        try {
          const response = await viewProfile();
          setUser(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
  }, []);

  // // Client Generator

  // useEffect(() => {
  //   const generateUser = async () => {
  //     // await signUpClient(setUser);
  //     await signUpDoctor(setUser);
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
