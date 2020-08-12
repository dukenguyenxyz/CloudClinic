import React, { useState, useEffect } from 'react';
import { viewProfile } from '../../components/AxiosTest/userRoutes';

export const AuthContext = React.createContext();
export const AuthContextProvider = ({ children }) => {
  // First time user
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // // handles fist page load with a valid user that has a jwt
  useEffect(() => {
    const jwt = localStorage.getItem('cloudclinicJWT');
    //login with active jwt
    if (user === null && jwt) {
      const getUser = async () => {
        try {
          const response = await viewProfile();
          setUser(response.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        } catch (error) {
          setTimeout(() => {
            setIsLoading(false);
            console.log(error);
          }, 2000);
        }
      };
      getUser();
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [user]);

  // // Client Generator

  // useEffect(() => {
  //   const generateUser = async () => {
  //     await signUpClient(setUser);
  //     // await signUpDoctor(setUser);
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
