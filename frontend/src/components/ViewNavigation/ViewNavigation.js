import React from 'react';
import './ViewNavigation.scss';
import { Link } from '@reach/router';
import Button from '../Button/Button';

const ViewNavigation = ({ location }) => {
  const showNavigationControls = () => {
    const patientListRegex = /patients\/\d*/;
    // e.g patients/123223
    if (patientListRegex.test(location.pathname)) {
      // if (location.pathname === '/patients/3') {
      return (
        <div className="view-navigation-wrapper">
          <Link to="/patients">
            <Button
              action="Back to patient list"
              color="navy"
              icon="arrowLeft"
            />
          </Link>
        </div>
      );
    }

    return null;
  };

  return <div>{showNavigationControls()}</div>;
};

export default ViewNavigation;
