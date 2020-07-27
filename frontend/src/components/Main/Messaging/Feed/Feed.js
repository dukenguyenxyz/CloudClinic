import React from 'react';
import './Feed.scss';
import Message from './Message/Message';
import Input from './Input/Input';
import Card from '../../../Card/Card';
import Image1 from '../../../../assets/fd-30.jpg';
import Image2 from '../../../../assets/fd-36.jpg';

const Feed = () => {
  const userOne = {
    backgroundImage: `url(${Image1})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '50px',
    height: '50px',
    alignSelf: 'end',
  };

  const userTwo = {
    backgroundImage: `url(${Image2})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '50px',
    height: '50px',
    alignSelf: 'end',
  };

  const senderStyles = {
    messageWrapper: {
      display: 'grid',
      gridTemplateColumns: '50px auto',
      gap: '8px',
      marginBottom: '24px',
    },
  };

  const receiverStyles = {
    messageWrapper: {
      display: 'grid',
      gridTemplateColumns: 'auto 50px',
      gap: '8px',
      marginBottom: '24px',
    },
  };

  // .message-wrapper {
  //   display: grid;
  //   grid-template-columns: 50px auto;
  //   gap: 8px;
  //   margin-bottom: 24px;

  //   .user-avatar {
  //     align-content: end;
  //   }

  //   .message-container {
  //     display: grid;
  //     .time-stamp {
  //       font-size: 10px;
  //       color: var(--mid-grey);
  //       justify-self: center;
  //       margin-bottom: 8px;
  //     }
  //   }

  //   .message {
  //     background-color: var(--light-blue);
  //     padding: 24px;
  //     border-top-left-radius: var(--border-radius);
  //     border-top-right-radius: var(--border-radius);
  //     border-bottom-right-radius: var(--border-radius);

  //     p {
  //       font-size: 14px;

  //       @media all and (max-width: 550px) {
  //         font-size: 12px;
  //       }
  //     }

  //     @media all and (max-width: 550px) {
  //       padding: 12px;
  //     }
  //   }
  // }

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
