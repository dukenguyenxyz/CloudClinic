import React from 'react';
import './Card.scss';
import Search from '../Search/Search';

const Card = () => {
  return (
    <div className="card-wrapper">
      <h1>I'm inside a card</h1>
      <p>hello</p>
      <Search />
    </div>
  );
};

export default Card;
