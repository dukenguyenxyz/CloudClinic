import React, { useState, useContext, useEffect } from 'react';
import './Search.scss';
import { SearchContext, DoctorListContext } from '../../globalState/index';
import { Search as SearchIcon } from 'react-feather';
import { viewDoctors } from '../AxiosTest/userRoutes';

const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="search-wrapper">
      <i>
        <SearchIcon size={20} color={'#acb5bd'} />
      </i>
      <input
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={e => handleChange(e)}
        aria-label="Search"
      />
    </div>
  );
};

export default Search;
