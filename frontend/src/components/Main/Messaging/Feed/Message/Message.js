import React from 'react';
import './Message.scss';

const Message = ({ userImage, isSender }) => {
  const senderMessage = () => {
    return (
      <div className="message-wrapper-sender">
        <div className="user-avatar" style={userImage} />
        <div className="message-container">
          <span className="time-stamp">9:04 AM</span>
          <div className="message sender">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti
              quas maiores repellat veniam animi in recusandae distinctio
              accusantium, rerum eveniet officiis fuga autem voluptatum, beatae
              dolore voluptatibus suscipit voluptate enim?
            </p>
          </div>
        </div>
      </div>
    );
  };

  const receiverMessage = () => {
    return (
      <div className="message-wrapper-receiver">
        <div className="message-container">
          <span className="time-stamp">9:04 AM</span>
          <div className="message receiver">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti
              quas maiores repellat veniam animi in recusandae distinctio
              accusantium, rerum eveniet officiis fuga autem voluptatum, beatae
              dolore voluptatibus suscipit voluptate enim?
            </p>
          </div>
        </div>
        <div className="user-avatar" style={userImage} />
      </div>
    );
  };

  return isSender ? senderMessage() : receiverMessage();
};

export default Message;
