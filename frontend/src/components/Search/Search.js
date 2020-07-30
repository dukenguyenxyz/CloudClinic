import React, { useState, useContext, useEffect } from 'react';
import './Search.scss';
import { SearchContext, DoctorListContext } from '../../globalState/index';
import { Search as SearchIcon } from 'react-feather';
import { viewDoctors } from '../AxiosTest/userRoutes';

const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const { doctorList } = useContext(DoctorListContext);

  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  // useEffect(()=> {
  //   if (!searchValue) {

  //   }
  // },[searchValue])

  return (
    <div className="search-wrapper">
      <i>
        <SearchIcon size={20} color={'#acb5bd'} />
      </i>
      <input
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={e => {
          // Change value
          setSearchValue(e.target.value);

          // // Pass as prop/ Render the search page if e.target.value is not empty
          // if (e.target.value) {

          // }

          // Display list of doctors
        }}
        aria-label="Search"
      />
    </div>
  );
};

export default Search;
