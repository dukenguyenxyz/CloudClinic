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
      to={`doctors/${doctor._id}`}
      state={doctor}
      onClick={() => handleNavigation()}
    >
      <div className="doctor-list-item-wrapper">
        <div className="doctor-list-item-container">
          <div className="profile">
            <img
              className="avatar"
              src={doctor.profileImage ? doctor.profileImage : null}
              alt=""
            />
            <div>
              {doctor.firstName} {doctor.lastName}
            </div>
          </div>
          <span className="speciality">{doctor.doctorInfo.specialtyField}</span>
        </div>
      </div>
    </Link>
  );
};

export default DoctorListItem;
