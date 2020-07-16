import React, { useState } from 'react';

export const SearchContext = React.createContext();
const SearchContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');

  const searchState = {
    searchValue,
    setSearchValue,
  };
  return (
    <SearchContext.Provider value={searchState}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
