import React, { useContext } from 'react';
import './Search.scss';
import { SearchContext } from '../../globalState/index';

const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder=""
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default Search;
