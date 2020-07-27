import React from 'react';
import Card from '../../../Card/Card';
import './Notes.scss';

const Notes = () => {
  return (
    <Card>
      <div className="notes-wrapper">
        <h1>Notes</h1>
        <div className="user-details-wrapper">
          <div className="grid-item">
            <div className="user-info">
              <span>Date</span>
              <span>01/01/2015</span>
            </div>
          </div>
          <div className="grid-item">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              optio esse placeat velit tempore. Ad, officia nihil laboriosam
              veniam animi eos esse quis veritatis libero ea velit dolore dolor
              amet dolorum quae fugiat harum suscipit! Quo fugiat quod eveniet
              maxime temporibus dolorem voluptatem, ad nisi dicta
              exercitationem, unde eos odit!
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Notes;
