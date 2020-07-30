import React, { useContext } from 'react';
import './DoctorListItem.scss';
import { Link } from '@reach/router';
import { SearchContext } from '../../../globalState/index';

const DoctorListItem = ({ doctor }) => {
  const { setSearchValue } = useContext(SearchContext);

  const handleNavigation = () => {
    setTimeout(() => {
      setSearchValue('');
    }, 1000);
  };

  return (
    <Link
      to={`/${doctor._id}`}
      state={doctor}
      onClick={() => handleNavigation()}
    >
      <div className="doctor-list-item-wrapper">
        <div className="doctor-list-item-container">
          <div className="profile">
            <img
              className="avatar"
              src={doctor.profileImage ? doctor.profileImage : null}
            />
            <div>
              {doctor.firstName} {doctor.lastName}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DoctorListItem;
