import React, { useState } from 'react';

export const MessageContext = React.createContext();
export const MessageContextProvider = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState(null);

  const messageState = {
    flashMessage,
    setFlashMessage,
  };
  return (
    <MessageContext.Provider value={messageState}>
      {children}
    </MessageContext.Provider>
  );
};
