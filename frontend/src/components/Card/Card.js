import React from 'react';
import './Card.scss';

const Card = ({ children }) => {
  return (
    <div className="card-wrapper">
      <div className="trim" />
      <div className="card-container">{children}</div>
    </div>
  );
};

export default Card;
