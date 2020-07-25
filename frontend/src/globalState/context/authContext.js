import React, { useState } from 'react';

export const AuthContext = React.createContext();
export const AuthContextProvider = ({ children }) => {
  const [isDoctor, setIsDoctor] = useState(false);
  const [user, setUser] = useState({});

  // First time user
  // const [user, setUser] = useState(null);

  const setClient = () => {
    setUser({});
    localStorage.set(
      'jwt',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFiYmNlOGY3MmIxOGUxYzkzNmJhYzgiLCJpYXQiOjE1OTU2NTMzNTJ9.pw283wkMJxL2bDLGVtx90NBrjeh9_9vTYiTioku6I7k'
    );
  };

  const setDoctor = () => {
    setUser({});
    localStorage.set(
      'jwt',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFiYmNlOGY3MmIxOGUxYzkzNmJhYzgiLCJpYXQiOjE1OTU2NTMzNTJ9.pw283wkMJxL2bDLGVtx90NBrjeh9_9vTYiTioku6I7k'
    );
  };

  isDoctor ? setDoctor() : setClient();

  const authState = {
    user,
    setUser,
  };
  return (
    <AuthContext.Provider value={authState}> {children} </AuthContext.Provider>
  );
};
