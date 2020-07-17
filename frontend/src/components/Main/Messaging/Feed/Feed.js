import React from 'react';
import './Feed.scss';

const Feed = () => {
  const style = {
    backgroundColor: 'blue',
    width: '100px',
    height: '100px',
  };
  return (
    <div>
      <h1>Hi i'm in the messaging view</h1>
      <div style={style} />
    </div>
  );
};

export default Feed;
