import React, { useState, useContext } from 'react';
import './Search.scss';
import { SearchContext } from '../../globalState/index';
import { Search as SearchIcon } from 'react-feather';
import { viewDoctors } from '../AxiosTest/userRoutes';

const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const [doctors, setDoctors] = useState([]);

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

          // Make axios call
          const getData = async () => {
            if (doctors.length === 0) {
              try {
                const response = await viewDoctors();
                const doctorsResult = response.data.map(
                  doctor => `${doctor.firstName} ${doctor.lastName}`
                );
                setDoctors(doctorsResult);
              } catch (error) {
                console.log(error);
              }
            }

            const searchDoctor = doctors.filter(doctorName =>
              doctorName.includes(e.target.value)
            );

            console.log(searchDoctor);
          };
          getData();

          // Parse the e.target.value by response.data

          // Pass as prop/ Render the search page if e.target.value is not empty

          // Display list of doctors
        }}
        aria-label="Search"
      />
    </div>
  );
};

export default Search;
