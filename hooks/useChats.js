import React, { useContext } from 'react';

export const ChatsContext = React.createContext({});

export default () => {
  return (
    useContext(ChatsContext)
  );
}
