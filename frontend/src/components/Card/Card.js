import React, { useContext } from 'react';
import './Card.scss';
import Search from '../Search/Search';
import { SearchContext } from '../../globalState/index';

const Card = () => {
  const { searchValue } = useContext(SearchContext);
  return (
    <>
      <div className="card-wrapper">
        <Search />
      </div>
      <h1>{searchValue}</h1>
    </>
  );
};

export default Card;
