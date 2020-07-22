import React, { useState } from 'react';

export const NavbarContext = React.createContext();
export const NavbarContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navbarState = {
    isOpen,
    setIsOpen,
  };
  return (
    <NavbarContext.Provider value={navbarState}>
      {children}
    </NavbarContext.Provider>
  );
};
