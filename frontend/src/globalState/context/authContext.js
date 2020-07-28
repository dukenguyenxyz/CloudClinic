import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { viewProfile } from '../../components/AxiosTest/userRoutes';

export const AuthContext = React.createContext();
export const AuthContextProvider = ({ children }) => {
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

  const authState = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={authState}>
      {user ? children : <h1>loading...</h1>}
    </AuthContext.Provider>
  );
};
