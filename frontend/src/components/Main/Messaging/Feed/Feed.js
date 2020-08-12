import React from 'react';
import './Feed.scss';
import Message from './Message/Message';
import Input from './Input/Input';
import Image1 from '../../../../assets/fd-30.jpg';
import Image2 from '../../../../assets/fd-36.jpg';

const Feed = () => {
  const userOne = {
    backgroundImage: `url(${Image1})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    alignSelf: 'end',
  };

  const userTwo = {
    backgroundImage: `url(${Image2})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    alignSelf: 'end',
  };

  return (
    <div className="feed-wrapper">
      <div className="trim" />
      <div className="feed-container">
        <Message userImage={userOne} />
        <Message userImage={userTwo} isSender />
        <Message userImage={userOne} />
        <Message userImage={userTwo} isSender />
        <Message userImage={userOne} />
        <Message userImage={userTwo} isSender />
        <Message userImage={userOne} />
        <Message userImage={userTwo} isSender />
        <Message userImage={userOne} />
        <Message userImage={userTwo} isSender />
        <Message userImage={userOne} />
        <Message userImage={userTwo} isSender />
        <Message userImage={userOne} />
        <Message userImage={userTwo} isSender />
      </div>
      <Input />
    </div>
  );
};

export default Feed;
