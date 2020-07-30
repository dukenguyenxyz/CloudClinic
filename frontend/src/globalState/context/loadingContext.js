import React, { useState } from 'react';

export const LoadingContext = React.createContext();
export const LoadingContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const loadingState = {
    isLoading,
    setIsLoading,
  };

  return (
    <LoadingContext.Provider value={loadingState}>
      {children}
    </LoadingContext.Provider>
  );
};
