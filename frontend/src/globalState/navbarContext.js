import React, { useState } from 'react';

export const NavbarContext = React.createContext();
export const NavbarContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');

  const searchState = {
    searchValue,
    setSearchValue,
  };
  return (
    <NavbarContext.Provider value={searchState}>
      {children}
    </NavbarContext.Provider>
  );
};
