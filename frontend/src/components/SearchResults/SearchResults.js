import React, { useContext, useEffect, useState } from 'react';
import { SearchContext, DoctorListContext } from '../../globalState/index';
import { v4 as uuidv4 } from 'uuid';
import { Link } from '@reach/router';
import DoctorListItem from '../Home/DoctorListItem/DoctorListItem';

const SearchResults = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const { doctorList } = useContext(DoctorListContext);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Parse the e.target.value by response.data
    if (doctorList.length > 0) {
      const searchDoctorResults = doctorList.filter(doctor => {
        const doctorName = `${doctor.firstName} ${doctor.lastName}`;
        return doctorName.includes(searchValue);
      });
      setSearchResults(searchDoctorResults);
    }
  }, [searchValue]);

  return (
    <div>
      <ul>
        {searchResults.map(doctor => {
          return (
            <li key={uuidv4()}>
              <DoctorListItem doctor={doctor} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchResults;
