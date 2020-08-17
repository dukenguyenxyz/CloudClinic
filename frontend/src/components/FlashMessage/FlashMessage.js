import React, { useContext } from 'react';
import { MessageContext } from '../../globalState/index';
import './FlashMessage.scss';
import { AlertCircle, Bell } from 'react-feather';

const FlashMessage = () => {
  const { flashMessage } = useContext(MessageContext);

  const setIcon = () => {
    const iconSize = 18;

    switch (flashMessage.icon) {
      case 'alert':
        return <AlertCircle size={iconSize} />;
      case 'notification':
        return <Bell size={iconSize} />;
      default:
        return '';
    }
  };

  const message = () => {
    return (
      <div className={`flash-message-wrapper ${flashMessage.type}`}>
        <div className="flash-message-container">
          <i>{setIcon()}</i>
          <div className="flash-message">{flashMessage.message}</div>
        </div>
      </div>
    );
  };

  return flashMessage ? message() : null;
};

export default FlashMessage;
