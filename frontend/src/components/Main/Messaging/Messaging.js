import React from 'react';
import './Messaging.scss';
import Feed from './Feed/Feed';
import Consultation from './Consultation/Consultation';
import Notes from './Notes/Notes';

const Messaging = () => {
  return (
    <div className="messaging-wrapper">
      <div>
        <Consultation />
        <Notes />
      </div>
      <Feed />
    </div>
  );
};

export default Messaging;
